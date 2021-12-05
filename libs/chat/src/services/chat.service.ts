import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TJwtUser } from '@libs/auth';
import { Chat, Manager, Message, User } from '@libs/entities';
import { ERRORS, ROLE } from '@libs/constants';
import { UnprocessableEntityError } from '@libs/exceptions';
import { SendMessageBodyDTO } from '../dtos/chat.controller.dtos';

@Injectable()
export class ChatService {
  @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>;
  @InjectRepository(User) private readonly userRepository: Repository<User>;
  @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>;
  @InjectRepository(Message) private readonly messageRepository: Repository<Message>;

  async sendMessage({ message, chatId, user }: SendMessageBodyDTO & { user: TJwtUser }): Promise<void> {
    const chat = await this.findChatOrFail(chatId);
    const sender = await this.getSenderOrFail(user);
    await this.validateUserBindingToChatOrFail(chat, sender);

    await this.messageRepository.save({
      chatId,
      senderId: ('institutionId' in sender) ? sender.userId : sender.id,
      content: message,
    });
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

  private async findChatOrFail(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id },
    });

    if (!chat) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.CHAT_NOT_FOUND,
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
