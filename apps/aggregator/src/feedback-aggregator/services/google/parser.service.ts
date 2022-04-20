import { Inject, Injectable } from '@nestjs/common';
import { AppLogger } from '@libs/logger';

import { IClientAggregations } from '../../interfaces/client-aggregation.intefaces';
import { FeedbackRepository } from '../../repositories/feedback.repository';
import { GooglePuppeteerParser } from './puppeteer.parser';
import { IParser } from './parser.interfaces';

@Injectable()
export class GoogleParserService implements IClientAggregations {
  private logger = new AppLogger(GoogleParserService.name);

  constructor(
    private readonly feedbacksRepository: FeedbackRepository,
    @Inject(GooglePuppeteerParser) private googleCheerioParser: IParser,
  ) {}

  async aggregate({
    platformId,
    institutionId,
    url,
  }: {
    institutionId: number;
    url: string;
    platformId: number;
  }): Promise<void> {
    const feedbacks = await this.googleCheerioParser.getFeedbacks(url, { institutionId, platformId });
    await this.feedbacksRepository.prepareAndSaveFeedbacks({
      feedbacks,
      platformId,
      institutionId,
    });
    this.logger.log(`institutionId: ${institutionId}, newFeedbacksCount: ${feedbacks.length}`);
  }
}
