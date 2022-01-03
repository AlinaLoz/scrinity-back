import { Inject, Injectable } from '@nestjs/common';

import { GetFeedbackAnalyticsQueryDTO, GetFeedbackAnalyticsResponseDTO } from '../dtos/analytics.dtos';
import { AnalyticsRepository } from '../repositories/analytics.repository';

@Injectable()
export class AnalyticsService {
  @Inject() private readonly analyticsRepository: AnalyticsRepository;

  async getFeedbackAnalytics(params: GetFeedbackAnalyticsQueryDTO & { institutionId: number }): Promise<GetFeedbackAnalyticsResponseDTO[]> {
    return await this.analyticsRepository.getFeedbackAnalytics(params);
  }
}
