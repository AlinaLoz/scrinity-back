import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { Chat } from '@libs/entities';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  async getChats(institutionId: number, query: {
    isAnonymously?: boolean,
    userId?: number,
    skip?: number,
    limit?: number,
  }): Promise<[Chat[], number]> {
    return await this.findAndCount({
      where: {
        institutionId,
        ...(query?.userId && { userId: query.userId }),
        ...(typeof query.isAnonymously === 'undefined' ? query.isAnonymously :
          query.isAnonymously ? { userId: IsNull() } : { userId: Not(IsNull()) }
        ),
      },
      relations: [
        'user', 'criterions', 'messages',
        'messages.files',
        'messages.files.file',
      ],
      ...(query.skip && { skip: query.skip }),
      ...(query.limit && { take: query.limit }),
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
