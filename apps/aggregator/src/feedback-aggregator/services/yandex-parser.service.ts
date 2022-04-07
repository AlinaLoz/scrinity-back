import cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { FeedbackEntity } from '@libs/entities';
import { AppLogger } from '@libs/logger';
import { sentryService } from '@libs/exceptions/services/sentry.service';

import { BaseParserService } from '@apps/aggregator/feedback-aggregator/services/base-parser.service';
import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';
import { FeedbackRepository } from '../repositories/feedback.repository';

axiosRetry(axios, { retries: 3 });

type YandexFeedback = {
  icon: string;
  name: string;
  profession: string;
  date: string;
  text: string;
  stars: number;
};

// если сообщений много, то показать больше

@Injectable()
export class YandexParserService extends BaseParserService implements IClientAggregations {
  private logger = new AppLogger(YandexParserService.name);

  constructor(
    private readonly feedbacksRepository: FeedbackRepository, // private readonly connection: Connection,
  ) {
    super();
  }

  async aggregate({
    url,
    platformId,
    institutionId,
  }: {
    institutionId: number;
    url: string;
    platformId: number;
  }): Promise<void> {
    const html = await this.getPageContent(url);
    if (!html) {
      return;
    }
    const feedbacks = await this.parseFeedbacks(html);
    const feedbacksToSave: Partial<FeedbackEntity>[] = feedbacks.map((feedback) => ({
      ...feedback,
      institutionId,
      platformId,
    }));
    await this.feedbacksRepository.saveFeedbacks(feedbacksToSave);
  }

  private async parseFeedbacks(buffer: Buffer): Promise<YandexFeedback[]> {
    try {
      const $ = await cheerio.load(buffer);
      const data: YandexFeedback[] = [];

      $('.business-reviews-card-view__review').each((i, elem) => {
        data.push({
          icon: $(elem).find('.business-review-view__user-icon').attr('href') || '',
          name: $(elem).find('.business-review-view__author span').text(),
          profession: $(elem).find('.business-review-view__author-profession').text(),
          date:
            $(elem)
              .find('.business-review-view__date')
              .html()
              ?.replace(/^.*content="/, '')
              .replace(/">/, '') || '',
          text: $(elem).find('.business-review-view__body-text').text(),
          stars: 5 - $(elem).find('.business-rating-badge-view__star._empty').length,
        });
      });
      this.logger.log(`found ${data.length} new feedbacks`);
      return data;
    } catch (err) {
      this.logger.error(`error parseFeedbacks: ${JSON.stringify(err)}`);
      sentryService.message(`error parseFeedbacks: ${JSON.stringify(err)}`);
      return [];
    }
  }
}
