import { Injectable } from '@nestjs/common';
import { AppLogger } from '@libs/logger';

import { PAGE_SIZE } from '../../constants/aggregator.constants';
import { AxiosPageFetcherService } from '../page-fetcher.services/axios-page-fetcher.service';
import { IClientAggregations } from '../../interfaces/client-aggregation.intefaces';
import { FeedbackRepository } from '../../repositories/feedback.repository';

type RelaxFeedback = {
  author: string;
  text: string;
  date: number;
  rating: number;
};

type RelaxResponse = {
  response: {
    review: RelaxFeedback;
  }[];
};

@Injectable()
export class RelaxApiService implements IClientAggregations {
  private logger = new AppLogger(RelaxApiService.name);

  constructor(
    private readonly feedbacksRepository: FeedbackRepository,
    private readonly axiosPageFetcherService: AxiosPageFetcherService,
  ) {}

  async aggregate({
    url,
    platformId,
    institutionId,
  }: {
    institutionId: number;
    url: string;
    platformId: number;
  }): Promise<void> {
    const feedbacks = await this.getFeedbacks({
      url,
      platformId,
      institutionId,
    });
    const preparedFeedbacks = feedbacks.map((item) => ({
      ...item,
      date: new Date(item.date * 1000).toISOString(),
      rating: item.rating || 0,
    }));

    await this.feedbacksRepository.prepareAndSaveFeedbacks({
      feedbacks: preparedFeedbacks,
      platformId,
      institutionId,
    });
    this.logger.log(`institutionId: ${institutionId}, newFeedbacksCount: ${feedbacks.length}`);
  }

  private async getFeedbacks({
    url,
    platformId,
    institutionId,
  }: {
    institutionId: number;
    url: string;
    platformId: number;
  }): Promise<RelaxFeedback[]> {
    const prepareUrl = this.prepareUrlByPage(url);
    const result = await this.axiosPageFetcherService.getPageContent<RelaxResponse>(prepareUrl, true);
    if (!result) {
      return [];
    }
    const feedbacks = result.response.map(({ review }) => review);
    const dateLastFeedback = await this.feedbacksRepository.getDateOfLastFeedback(platformId, institutionId);
    this.logger.log(`institutionId: ${institutionId}, dateLastFeedback: ${dateLastFeedback}`);
    const indexPrevSaved = feedbacks.findIndex(
      (item) => item.date === new Date(dateLastFeedback || 0).getTime() / 1000,
    );
    return indexPrevSaved === -1 ? feedbacks : feedbacks.slice(0, indexPrevSaved);
  }

  private prepareUrlByPage(url: string, page: number = 1): string {
    const offset = (page - 1) * PAGE_SIZE;
    return `${url}&limit=${PAGE_SIZE}&offset=${offset}`;
  }
}
