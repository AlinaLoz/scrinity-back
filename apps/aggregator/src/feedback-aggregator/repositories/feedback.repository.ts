import { EntityRepository, Repository } from 'typeorm';

import { FeedbackEntity } from '@libs/entities';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  saveFeedbacks(items: Partial<FeedbackEntity>[]): Promise<any> {
    return this.createQueryBuilder()
      .insert()
      .into(FeedbackEntity)
      .values(items)
      .onConflict('("date", "name") DO NOTHING')
      .execute();
  }
}
