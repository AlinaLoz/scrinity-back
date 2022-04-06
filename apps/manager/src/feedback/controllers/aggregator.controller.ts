import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtManager } from '@libs/auth';
import { GetFeedbacksBodyDTO, GetFeedbacksResponseDTO } from '../dtos/feedback.controller.dtos';
import { AggregatorService } from '../services/aggregator.service';

@Controller('feedbacks')
@ApiTags('feedbacks')
@UseGuards(JwtAuthGuard)
export class AggregatorController {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @Get('/')
  @ApiProperty({ type: GetFeedbacksResponseDTO })
  async getFeedbacks(
    @Request() req: { user?: TJwtManager },
    @Query() body: GetFeedbacksBodyDTO,
  ): Promise<GetFeedbacksResponseDTO> {
    const institutionId = req.user!.institutionId;
    return new GetFeedbacksResponseDTO(
      await this.aggregatorService.getFeedbacks({
        ...body,
        institutionId,
      }),
    );
  }
}
