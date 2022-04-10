import { Inject, Injectable } from '@nestjs/common';

import { FeedbackEntity } from '@libs/entities';
import { AppLogger } from '@libs/logger';

import { IClientAggregations } from '../../interfaces/client-aggregation.intefaces';
import { FeedbackRepository } from '../../repositories/feedback.repository';
import { YandexCheerioParser } from './cheerio.parser';
import { YandexPuppeteerParser } from './puppeteer.parser';
import { IParser, YandexFeedback } from './parser.interfaces';

export enum PAGE_FETCHER {
  CHEERIO = 'CHEERIO',
  PUPPETEER = 'PUPPETEER',
}
export const CURRENT_PAGE_FETCHER = PAGE_FETCHER.PUPPETEER;

@Injectable()
export class YandexParserService implements IClientAggregations {
  private logger = new AppLogger(YandexParserService.name);

  constructor(
    private readonly feedbacksRepository: FeedbackRepository,
    @Inject(YandexCheerioParser) private yandexCheerioParser: IParser,
    @Inject(YandexPuppeteerParser) private yandexPuppeteerParser: IParser,
  ) {}

  async aggregate({
    url,
    platformId,
    institutionId,
  }: {
    url: string;
    institutionId: number;
    platformId: number;
  }): Promise<void> {
    this.logger.log(`institutionId: ${institutionId}, PAGE_FETCHER: ${CURRENT_PAGE_FETCHER}`);
    const feedbacks = await this.getFeedbacks(CURRENT_PAGE_FETCHER, url, {
      institutionId,
      platformId,
    });
    await this.saveFeedbacks({
      feedbacks,
      platformId,
      institutionId,
    });
    this.logger.log(`institutionId: ${institutionId}, newFeedbacksCount: ${feedbacks.length}`);
  }

  private async saveFeedbacks({
    institutionId,
    platformId,
    feedbacks,
  }: {
    feedbacks: YandexFeedback[];
    institutionId: number;
    platformId: number;
  }): Promise<void> {
    const feedbacksToSave: Partial<FeedbackEntity>[] = feedbacks.map((feedback) => ({
      ...feedback,
      institutionId,
      platformId,
    }));
    await this.feedbacksRepository.saveFeedbacks(feedbacksToSave);
  }

  private getFeedbacks(
    type: PAGE_FETCHER,
    url: string,
    props: {
      institutionId: number;
      platformId: number;
    },
  ): Promise<YandexFeedback[]> {
    switch (type) {
      case PAGE_FETCHER.CHEERIO: {
        return this.yandexCheerioParser.getFeedbacks(url, props);
      }
      case PAGE_FETCHER.PUPPETEER: {
        return this.yandexPuppeteerParser.getFeedbacks(url, props);
      }
      default:
        throw new Error('UNSUPPORTED_FETCHER_TYPE');
    }
  }
}
