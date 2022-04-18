import { Injectable } from '@nestjs/common';
import { AppLogger } from '@libs/logger';

import { IClientAggregations } from '../../interfaces/client-aggregation.intefaces';
import { FeedbackRepository } from '../../repositories/feedback.repository';

@Injectable()
export class GoogleParserService implements IClientAggregations {
  private logger = new AppLogger(GoogleParserService.name);

  constructor(
    private readonly feedbacksRepository: FeedbackRepository, // @Inject(YandexCheerioParser) private yandexCheerioParser: IParser, // @Inject(YandexPuppeteerParser) private yandexPuppeteerParser: IParser,
  ) {}

  aggregate({
    platformId,
    institutionId,
    url,
  }: {
    institutionId: number;
    url: string;
    platformId: number;
  }): Promise<void> {
    /* eslint-disable */
    console.log('platformId, institutionId, url', platformId, institutionId, url);
    return Promise.resolve(undefined);
  }
}
