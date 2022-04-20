import puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

import { AppLogger } from '@libs/logger';
import { sentryService } from '@libs/exceptions/services/sentry.service';

import { FeedbackRepository } from '../../repositories/feedback.repository';
import { PuppeterPageFetcherService } from '../page-fetcher.services/puppeter-page-fetcher.service';
import { FEEDBACK_LIMIT } from '../../constants/aggregator.constants';
import { IParser, GoogleFeedback } from './parser.interfaces';

const SCROLL_DELAY_MS = 2000;
const STEP_SIZE_PX = 1000000;

@Injectable()
export class GooglePuppeteerParser implements IParser {
  private logger = new AppLogger(GooglePuppeteerParser.name);

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
  ): Promise<GoogleFeedback[]> {
    try {
      const page = await this.puppeterPageFetcherService.getPage(url);
      return this.parseFeedbacksByDocument(page);
    } catch (error) {
      this.logger.error(`parseFeedbacksByDocument: ${error}`);
      sentryService.error(`parseFeedbacksByDocument - ${error}`);
      return this.getFeedbacks(url, { institutionId, platformId });
    }
  }

  private async parseFeedbacksByDocument(page: puppeteer.Page): Promise<GoogleFeedback[]> {
    await this.changeRankingView(page);
    const items: GoogleFeedback[] = [];
    while (items.length < FEEDBACK_LIMIT) {
      const parsedItems: GoogleFeedback[] = await page.evaluate(GooglePuppeteerParser.extractItems);

      items.push(...parsedItems);

      if (!parsedItems.length) {
        break;
      }

      const previousHeight = await page.evaluate('document.body.scrollHeight');
      const newScrollTop = previousHeight + STEP_SIZE_PX;
      this.logger.debug(`previousHeight: ${previousHeight}, newScrollTop: ${newScrollTop}`);

      await page.evaluate(`document.querySelector('[role="main"]').children[1].scroll(0, ${newScrollTop})`);
      await page.waitForTimeout(SCROLL_DELAY_MS);
    }
    return items;
  }

  private async changeRankingView(page: puppeteer.Page): Promise<void> {
    await page.evaluate(`
      document.querySelector('[aria-label="Дать согласие на использование файлов cookie и других данных в целях, описанных выше"]').click();
    `);
    await page.waitForTimeout(SCROLL_DELAY_MS * 10);
    await page.evaluate(`
      document.querySelector('[aria-label="Самые релевантные"]').click();
    `);
    await page.waitForTimeout(SCROLL_DELAY_MS);
    await page.evaluate(`
      document.querySelector('[role="menu"]')?.children[1]?.click()
    `);
    await page.waitForTimeout(SCROLL_DELAY_MS);
  }

  static extractItems(): GoogleFeedback[] {
    const extractedElements = [
      ...(document.querySelector('[aria-label="Сначала новые"]')?.parentElement?.nextElementSibling?.nextElementSibling
        ?.children || []),
      // @ts-ignore
    ].filter((element) => element['ariaLabel']);

    const feedbacks = extractedElements.map((element) => {
      const feedback = element.children[0].children[2];

      if (!feedback) {
        return null;
      }
      return {
        icon: feedback.children[0]?.querySelector('img')?.src || '',
        author: feedback.children[1]?.querySelector('span')?.innerHTML || '',
        date: new Date().toISOString(),
        // date: feedback.children[3]?.querySelector('span:nth-child(3)')?.innerHTML || '',
        text: feedback.children[3]?.children[1].querySelector('span:nth-child(2)')?.innerHTML || '',
        rating:
          feedback.children[3].querySelector('span:nth-child(2)')?.getAttribute('aria-label')?.trim().split(' ')[0] ||
          0,
      };
    });

    return feedbacks.filter((item) => item) as GoogleFeedback[];
  }
}
