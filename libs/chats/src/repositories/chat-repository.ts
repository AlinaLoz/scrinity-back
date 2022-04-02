import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '@libs/entities';
import { CHAT_AUTH_TYPE } from '../../../../apps/manager/src/сhats/dtos/chats.controller.dtos';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  getChats(
    institutionId: number,
    query: {
      authType?: CHAT_AUTH_TYPE;
      userId?: number;
      skip?: number;
      limit?: number;
    },
  ): Promise<[Chat[], number]> {
    return this.findAndCount({
      where: {
        institutionId,
        ...(query?.userId && { userId: query.userId }),
        ...(typeof query.authType === 'undefined' ? query.authType : { authType: query.authType }),
      },
      relations: ['user', 'criterions', 'messages', 'messages.files', 'messages.files.file'],
      ...(query.skip && { skip: query.skip }),
      ...(query.limit && { take: query.limit }),
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
