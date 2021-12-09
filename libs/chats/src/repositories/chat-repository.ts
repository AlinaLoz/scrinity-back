import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { Chat } from '@libs/entities';
import { GetPaginationQueryDTO } from '../dtos';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  async getChats(institutionId: number, query: GetPaginationQueryDTO): Promise<[Chat[], number]> {
    return await this.findAndCount({
      where: {
        institutionId,
        ...(typeof query.isAnonymously === 'undefined' ? query.isAnonymously :
          query.isAnonymously ? { userId: IsNull() } : { userId: Not(IsNull()) }
        ),
      },
      relations: ['user', 'criterions', 'messages'],
      ...(query.skip && { skip: query.skip }),
      ...(query.limit && { take: query.limit }),
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
