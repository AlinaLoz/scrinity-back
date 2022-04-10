import puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

import { AppLogger } from '@libs/logger';
import { sentryService } from '@libs/exceptions/services/sentry.service';

import { FeedbackRepository } from '../../repositories/feedback.repository';
import { PuppeterPageFetcherService } from '../page-fetcher.services/puppeter-page-fetcher.service';
import { IParser, YandexFeedback } from './parser.interfaces';

const SCROLL_DELAY_MS = 2000;
const STEP_SIZE_PX = 1000000;
const LIMIT_ITEMS = 100;

@Injectable()
export class YandexPuppeteerParser implements IParser {
  private logger = new AppLogger(YandexPuppeteerParser.name);

  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly puppeterPageFetcherService: PuppeterPageFetcherService,
  ) {}

  async getFeedbacks(
    url: string,
    {
      institutionId,
      platformId,
    }: {
      platformId: number;
      institutionId: number;
    },
  ): Promise<YandexFeedback[]> {
    try {
      const page = await this.puppeterPageFetcherService.getPage(url);
      const dateLastFeedback = await this.feedbackRepository.getDateOfLastFeedback(platformId, institutionId);
      this.logger.log(`institutionId: ${institutionId}, dateLastFeedback: ${dateLastFeedback}`);

      return this.parseFeedbacksByDocument(page, dateLastFeedback);
    } catch (error) {
      this.logger.error(`parseFeedbacksByDocument: ${error}`);
      sentryService.error(`parseFeedbacksByDocument - ${error}`);
      return this.getFeedbacks(url, { institutionId, platformId });
    }
  }

  private async parseFeedbacksByDocument(
    page: puppeteer.Page,
    dateLastFeedback: string | null,
  ): Promise<YandexFeedback[]> {
    await this.changeRankingView(page);
    const items = [];
    while (items.length < LIMIT_ITEMS) {
      const parsedItems: YandexFeedback[] = await page.evaluate(YandexPuppeteerParser.extractItems, items.length);

      const indexPrevSaved = parsedItems.findIndex((item) => item.date === dateLastFeedback);
      const newItems = indexPrevSaved === -1 ? parsedItems : parsedItems.slice(0, indexPrevSaved);
      items.push(...newItems);
      this.logger.log(`dateLastFeedback: ${dateLastFeedback}, newItems: ${newItems.length}`);

      if (!newItems.length || indexPrevSaved !== -1) {
        break;
      }

      const previousHeight = await page.evaluate('document.body.scrollHeight');
      const newScrollTop = previousHeight + STEP_SIZE_PX;
      this.logger.debug(`previousHeight: ${previousHeight}, newScrollTop: ${newScrollTop}`);

      await page.evaluate(`document.getElementsByClassName(\'scroll__container\')[0].scroll(0, ${newScrollTop});`);
      await page.waitForTimeout(SCROLL_DELAY_MS);
    }
    return items;
  }

  private async changeRankingView(page: puppeteer.Page): Promise<void> {
    await page.evaluate(`
      document.getElementsByClassName('rating-ranking-view')[0].click();
      [...document.getElementsByClassName('rating-ranking-view__popup-line')]
      .find((el) => el.textContent === 'По новизне')
      .click()
    `);
    await page.waitForTimeout(SCROLL_DELAY_MS);
  }

  static extractItems(prevCount = 0): YandexFeedback[] {
    const extractedElements = [...document.querySelectorAll('.business-reviews-card-view__review')].slice(prevCount);

    return extractedElements.map((element) => {
      return {
        // @ts-ignore
        icon: element.getElementsByClassName('business-review-view__user-icon')[0]?.href || '',
        name:
          element.getElementsByClassName('business-review-view__author')[0].getElementsByTagName('span')[0]
            .textContent || '',
        date: element
          .getElementsByClassName('business-review-view__date')[0]
          .innerHTML.replace(/^.*content="/, '')
          .replace(/">/, ''),
        profession: element.getElementsByClassName('business-review-view__author-profession')[0].textContent || '',
        text: element.getElementsByClassName('business-review-view__body-text')[0].textContent || '',
        stars: 5 - element.querySelectorAll('.business-rating-badge-view__star._empty').length,
      };
    });
  }
}
