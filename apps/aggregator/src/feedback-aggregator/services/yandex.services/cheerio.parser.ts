import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import { sentryService } from '@libs/exceptions/services/sentry.service';

import { AppLogger } from '@libs/logger';
import { AxiosPageFetcherService } from '../page-fetcher.services/axios-page-fetcher.service';
import { YandexFeedback, IParser } from './parser.interfaces';

@Injectable()
export class YandexCheerioParser implements IParser {
  private logger = new AppLogger(YandexCheerioParser.name);

  constructor(private readonly axiosPageFetcherService: AxiosPageFetcherService) {}

  async getFeedbacks(url: string): Promise<YandexFeedback[]> {
    const page = await this.axiosPageFetcherService.getPageContent(url);
    if (!page) {
      return [];
    }
    return this.parseFeedbacksByCheerio(page);
  }

  private async parseFeedbacksByCheerio(buffer: Buffer): Promise<YandexFeedback[]> {
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
      sentryService.error(`error parseFeedbacks: ${JSON.stringify(err)}`);
      return [];
    }
  }
}
