import { EntityRepository, InsertResult, Repository } from 'typeorm';

import { FeedbackEntity } from '@libs/entities';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  saveFeedbacks(items: Partial<FeedbackEntity>[]): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(FeedbackEntity)
      .values(items)
      .onConflict('("date", "name") DO NOTHING')
      .execute();
  }

  async getDateOfLastFeedback(platformId: number, institutionId: number): Promise<string | null> {
    const feedback = await this.findOne({
      where: { institutionId, platformId },
      order: {
        date: 'DESC',
      },
    });
    return !feedback ? null : new Date(feedback.date).toISOString();
  }
}
// 2022-01-04 11:33:46
