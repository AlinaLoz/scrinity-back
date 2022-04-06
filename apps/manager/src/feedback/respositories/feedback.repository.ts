import { EntityRepository, Repository } from 'typeorm';

import { FeedbackEntity } from '@libs/entities';
import { PLATFORM_AGGREGATORS } from '@libs/constants';
import { PaginationDTO } from '@libs/dtos';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  getFeedbacks(
    institutionId: number,
    key: PLATFORM_AGGREGATORS,
    query: Partial<PaginationDTO>,
  ): Promise<[FeedbackEntity[], number]> {
    return this.findAndCount({
      relations: ['platform'],
      where: {
        institutionId,
        platform: { name: key },
      },
      ...(query.skip && { skip: query.skip }),
      ...(query.limit && { take: query.limit }),
      order: {
        date: 'DESC',
      },
    });
  }
}
