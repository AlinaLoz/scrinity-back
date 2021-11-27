import { Inject, Injectable } from '@nestjs/common';

import { Chat } from '@libs/entities';
import { NotFoundError } from '@libs/exceptions';
import { ERRORS } from '@libs/constants';
import { ChatMessageDTO, GetChatsResponseDTO, GetPaginationQueryDTO } from '../dtos/chat.controller.dtos';
import { ChatRepository } from '../repositories';

@Injectable()
export class ChatsService {
  @Inject() private readonly chatsRepository: ChatRepository;

  async getChats(institutionId: number, query: GetPaginationQueryDTO): Promise<GetChatsResponseDTO> {
    const [chats, total] = await this.chatsRepository.getChats(institutionId, query);

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
  
  async getChat(institutionId: number, chatId: number): Promise<ChatMessageDTO[]> {
    const chat = await this.getChatOrFail(institutionId, chatId);
    return chat.messages.map((item) => ({
      id: item.id,
      content: item.content,
      createdAt: item.createdAt,
      sender: item.sender,
      files: item.files.map((file) => ({ filename: file.file.filename })),
    }));
  }
  
  private async getChatOrFail(institutionId: number, chatId: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { institutionId, id: chatId },
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
}

