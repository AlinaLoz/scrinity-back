import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TJwtUser } from '@libs/auth';
import { Chat, Manager, Message, User } from '@libs/entities';
import { ERRORS, ROLE } from '@libs/constants';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';

import { ChatMessageDTO, GetChatsResponseDTO, SendMessageBodyDTO } from '../dtos';
import { ChatRepository } from '../repositories/';

@Injectable()
export class LibChatService {

  constructor(
    private readonly libChatsRepository: ChatRepository,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
  ) {
  }
  async sendMessage({ message, chatId, user }: SendMessageBodyDTO & { user: TJwtUser }): Promise<void> {
    const chat = await this.findChatOrFail({ id: chatId });
    const sender = await this.getSenderOrFail(user);
    await this.validateUserBindingToChatOrFail(chat, sender);

    await this.messageRepository.save({
      chatId,
      senderId: ('institutionId' in sender) ? sender.userId : sender.id,
      content: message,
    });
  }

  async getChat(where: {
    institutionId?: number,
    id?: number,
    userId?: number,
  }): Promise<ChatMessageDTO[]> {
    const chat = await this.getChatOrFail(where);
    return chat.messages.map((item) => ({
      id: item.id,
      content: item.content,
      createdAt: item.createdAt,
      sender: item.sender,
      files: item.files.map((file) => ({ filename: file.file.filename })),
    }));
  }

  async getChats(institutionId: number, query: {
    isAnonymously?: boolean,
    userId?: number,
    skip?: number,
    limit?: number,
  }): Promise<GetChatsResponseDTO> {
    
    console.log('query', query);
    
    const [chats, total] = await this.libChatsRepository.getChats(institutionId, query);

    return {
      total,
      items: chats.map((item) => ({
        id: item.id,
        isGood: item.isGood,
        phoneNumber: item.user?.phoneNumber,
        criterion: item.criterions?.map(({ criterionKey }) => criterionKey),
        message: item.messages[0].content,
        createdAt: item.createdAt,
      })),
    };
  }

  private async getChatOrFail(where: {
    institutionId?: number,
    id?: number,
    userId?: number,
  }): Promise<Chat> {
    const chat = await this.libChatsRepository.findOne({
      where,
      relations: [
        'messages',
        'messages.sender',
        'messages.files',
        'messages.files.file',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    if (!chat) {
      throw new NotFoundError([{
        field: 'chatId', message: ERRORS.CHAT_NOT_FOUND,
      }]);
    }
    return chat;
  }

  private async getSenderOrFail(user: TJwtUser): Promise<User | Manager> {
    if (user.role === ROLE.MANAGER) {
      return await this.findManagerOrFail(user.userId);
    }
    return await this.findUserOrFail(user.userId);
  }

  private async findManagerOrFail(id: number): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!manager) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.MANAGER_NOT_FOUND,
      }]);
    }
    return manager;
  }

  private async findUserOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.USER_NOT_FOUND,
      }]);
    }
    return user;
  }

  protected async findChatOrFail(where: { link?: string, id?: number }): Promise<Chat> {
    const chat = await this.libChatsRepository.findOne({ where });

    if (!chat) {
      throw new UnprocessableEntityError([{
        field: 'chatId', message: ERRORS.CHAT_NOT_FOUND,
      }]);
    }
    return chat;
  }

  private async validateUserBindingToChatOrFail(chat: Chat, sender: User | Manager): Promise<void> {
    if (!chat.userId) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.ANONYMOUSLY_CHAT,
      }]);
    }
    if ('institutionId' in sender) {
      if (chat.institutionId !== sender.institutionId) {
        throw new UnprocessableEntityError([{
          field: '', message: ERRORS.INACCESSIBLE_CHAT,
        }]);
      }
    } else if (chat.userId !== sender.id) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.INACCESSIBLE_CHAT,
      }]);
    }
  }
}
