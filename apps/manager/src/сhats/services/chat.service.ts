import { Inject, Injectable } from '@nestjs/common';
import { GetChatsResponseDTO, GetPaginationQueryDTO } from '../dtos/chat.controller.dtos';
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
        createAt: item.createdAt,
      })),
    };
  }
}
