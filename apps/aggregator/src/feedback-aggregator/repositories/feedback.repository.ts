import { EntityRepository, InsertResult, Repository } from 'typeorm';

import { FeedbackEntity } from '@libs/entities';

type Feedback = {
  icon?: string;
  profession?: string;
  author: string;
  text: string;
  date: string;
  rating: number;
};

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  saveFeedbacks(items: Partial<FeedbackEntity>[]): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(FeedbackEntity)
      .values(items)
      .onConflict('("text", "author") DO NOTHING')
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

  async prepareAndSaveFeedbacks({
    institutionId,
    platformId,
    feedbacks,
  }: {
    feedbacks: Feedback[];
    institutionId: number;
    platformId: number;
  }): Promise<void> {
    const feedbacksToSave: Partial<FeedbackEntity>[] = feedbacks.map((feedback) => ({
      ...feedback,
      institutionId,
      platformId,
    }));
    await this.saveFeedbacks(feedbacksToSave);
  }
}
