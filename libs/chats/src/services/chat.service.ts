import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Not, Repository } from 'typeorm';

import { TJwtUser } from '@libs/auth';
import { Chat, File, Manager, MessageFile, User } from '@libs/entities';
import { ERRORS, ROLE } from '@libs/constants';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';

import { NotificationService } from '@libs/chats/services/notification.service';
import { LINK_CHANNEL } from '@libs/dtos';
import { CLIENT_URL } from 'config';
import { ChatMessageDTO, GetChatsResponseDTO, SendMessageBodyDTO } from '../dtos';
import { ChatRepository, MessageRepository } from '../repositories/';
import { CHAT_AUTH_TYPE } from '../../../../apps/manager/src/сhats/dtos/chats.controller.dtos';

@Injectable()
export class LibChatService {
  constructor(
    private libConnection: Connection,
    private readonly libChatsRepository: ChatRepository,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
    private readonly messageRepository: MessageRepository,
    private readonly notificationService: NotificationService,
  ) {}
  async sendMessage(data: SendMessageBodyDTO & { user: TJwtUser }): Promise<void> {
    const chat = await this.findChatOrFail({ id: data.chatId });
    const sender = await this.getSenderOrFail(data.user);
    await this.validateUserBindingToChatOrFail(chat, sender);

    await this.libConnection.transaction(async (manager) => {
      const files = await manager.save(
        File,
        data.filesKeys.map(
          (filename) =>
            new File({
              filename,
            }),
        ),
      );
      const message = await this.messageRepository.save({
        chatId: data.chatId,
        senderId: 'institutionId' in sender ? sender.userId : sender.id,
        content: data.message,
        read: false,
      });
      await manager.save(
        MessageFile,
        files.map(
          (file, index) =>
            new MessageFile({
              fileId: file.id,
              messageId: message.id,
              index,
            }),
        ),
      );
    });
    await this.sendNotification(sender, chat);
  }

  private async sendNotification(sender: User | Manager, chat: Chat): Promise<void> {
    if (!('institutionId' in sender)) {
      return;
    }
    if (chat.messages.length !== 1) {
      return;
    }
    await this.notificationService.sendNotification(
      chat.authType === CHAT_AUTH_TYPE.byEmail ? LINK_CHANNEL.EMAIL : LINK_CHANNEL.SMS,
      {
        email: chat.user.email,
        link: `${CLIENT_URL}${chat.link}`,
        phoneNumber: sender.user.phoneNumber,
      },
    );
  }

  async getChat(
    where: {
      institutionId?: number;
      id?: number;
      userId?: number;
    },
    userId?: number,
  ): Promise<ChatMessageDTO[]> {
    const chat = await this.getChatOrFail(where);
    const preparedUserId = userId || where.userId;
    if (preparedUserId) {
      await this.readAllMessages(chat.id, preparedUserId, chat.authType === CHAT_AUTH_TYPE.anonymously);
    }
    chat.messages = chat.messages.sort(({ id: idA }, { id: idB }) => (idA < idB ? -1 : 1));
    return chat.messages.map((item) => ({
      id: item.id,
      content: item.content,
      createdAt: item.createdAt,
      sender: item.sender,
      files: item.files.map((file) => ({
        filename: file.file.filename,
        index: file.index,
      })),
    }));
  }

  async getChats(
    institutionId: number,
    query: {
      authType?: CHAT_AUTH_TYPE;
      userId?: number;
      skip?: number;
      limit?: number;
    },
    userId: number,
  ): Promise<GetChatsResponseDTO> {
    const [chats, total] = await this.libChatsRepository.getChats(institutionId, query);

    return {
      total,
      items: chats.map((item) => {
        const numberOfUnread = item.messages.filter(({ read, senderId }) => {
          return userId !== senderId && !read;
        }).length;
        const lastMessage = item.messages.sort(({ id: idA }, { id: idB }) => (idA > idB ? -1 : 1))[0];

        return {
          id: item.id,
          isGood: item.isGood,
          sender: item?.user?.email || item?.user?.phoneNumber,
          criterion: item.criterions?.map(({ criterionKey }) => criterionKey),
          message: lastMessage.content,
          createdAt: item.createdAt,
          numberOfUnread,
          files: lastMessage.files.map((fileMessage) => ({
            ...fileMessage,
            ...fileMessage.file,
          })),
        };
      }),
    };
  }

  private async getChatOrFail(where: { institutionId?: number; id?: number; userId?: number }): Promise<Chat> {
    const chat = await this.libChatsRepository.findOne({
      where,
      relations: ['messages', 'messages.sender', 'messages.files', 'messages.files.file'],
      order: {
        createdAt: 'DESC',
      },
    });
    if (!chat) {
      throw new NotFoundError([
        {
          field: 'chatId',
          message: ERRORS.CHAT_NOT_FOUND,
        },
      ]);
    }
    return chat;
  }

  private async readAllMessages(chatId: number, userId: number, forceRead = false): Promise<void> {
    await this.messageRepository.update(
      {
        chatId,
        ...(!forceRead && { senderId: Not(In([userId])) }),
      },
      { read: true },
    );
  }

  private getSenderOrFail(user: TJwtUser): Promise<User | Manager> {
    if (user.role === ROLE.MANAGER) {
      return this.findManagerOrFail(user.userId);
    }
    return this.findUserOrFail(user.userId);
  }

  private async findManagerOrFail(userId: number): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where: { userId },
      relations: ['user'],
    });
    if (!manager) {
      throw new UnprocessableEntityError([
        {
          field: '',
          message: ERRORS.MANAGER_NOT_FOUND,
        },
      ]);
    }
    return manager;
  }

  private async findUserOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnprocessableEntityError([
        {
          field: '',
          message: ERRORS.USER_NOT_FOUND,
        },
      ]);
    }
    return user;
  }

  protected async findChatOrFail(where: { link?: string; id?: number }): Promise<Chat> {
    const chat = await this.libChatsRepository.findOne({ where, relations: ['messages', 'user'] });

    if (!chat) {
      throw new UnprocessableEntityError([
        {
          field: 'chatId',
          message: ERRORS.CHAT_NOT_FOUND,
        },
      ]);
    }
    return chat;
  }

  private validateUserBindingToChatOrFail(chat: Chat, sender: User | Manager): void {
    if (!chat.userId) {
      throw new UnprocessableEntityError([
        {
          field: '',
          message: ERRORS.ANONYMOUSLY_CHAT,
        },
      ]);
    }
    if ('institutionId' in sender) {
      if (chat.institutionId !== sender.institutionId) {
        throw new UnprocessableEntityError([
          {
            field: '',
            message: ERRORS.INACCESSIBLE_CHAT,
          },
        ]);
      }
    } else if (chat.userId !== sender.id) {
      throw new UnprocessableEntityError([
        {
          field: '',
          message: ERRORS.INACCESSIBLE_CHAT,
        },
      ]);
    }
  }
}
