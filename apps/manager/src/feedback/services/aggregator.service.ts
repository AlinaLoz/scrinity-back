import { Injectable } from '@nestjs/common';

import { GetFeedbacksBodyDTO, GetFeedbacksResponseDTO } from '../dtos/feedback.controller.dtos';
import { FeedbackRepository } from '../respositories/feedback.repository';

@Injectable()
export class AggregatorService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}
  async getFeedbacks({
    institutionId,
    key,
    skip,
    limit,
  }: {
    institutionId: number;
  } & GetFeedbacksBodyDTO): Promise<GetFeedbacksResponseDTO> {
    const [items, total] = await this.feedbackRepository.getFeedbacks(institutionId, key, { skip, limit });
    return { items, total };
  }
}
