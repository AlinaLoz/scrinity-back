import cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from 'config';

import { FeedbackEntity } from '@libs/entities';
import { AppLogger } from '@libs/logger';
import { sentryService } from '@libs/exceptions/services/sentry.service';

import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';

axiosRetry(axios, { retries: 3 });

type YandexFeedback = {
  icon: string;
  name: string;
  profession: string;
  date: string;
  text: string;
  stars: number;
};

// брать страницу, но сохранять только последние
// если сообщений много, то показать больше

@Injectable()
export class YandexParserService implements IClientAggregations {
  private logger = new AppLogger(YandexParserService.name);

  constructor(private readonly connection: Connection) {}

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
    await this.connection.transaction(async (manager) => {
      const feedbacksToSave: Partial<FeedbackEntity>[] = feedbacks.map((feedback) => ({
        ...feedback,
        institutionId,
        platformId,
      }));
      const feedbackRepository = manager.getRepository(FeedbackEntity);
      await feedbackRepository.save(feedbacksToSave);
    });
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

  private async getPageContent(url: string): Promise<Buffer | null> {
    try {
      const { data } = await axios.get(url, {
        proxy: {
          protocol: config.PROXY.PROTOCOL,
          host: config.PROXY.HOST,
          port: config.PROXY.PORT,
          auth: {
            username: config.PROXY.USERNAME,
            password: config.PROXY.PASSWORD,
          },
        },
      });
      return data;
    } catch (err) {
      this.logger.error(`error get page - ${url}: ${JSON.stringify(err)}`);
      sentryService.message(`error get page - ${url}: ${JSON.stringify(err)}`);
      return null;
    }
  }
}
