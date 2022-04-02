import { Controller, Get, Inject, Query, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtManager } from '@libs/auth';
import {
  GetCriterionsAnaliticsQueryDTO,
  GetCriterionsAnaliticsResponseDTO,
  GetFeedbackAnalyticsQueryDTO,
  GetFeedbackAnalyticsResponseDTO,
} from '../dtos/analytics.dtos';
import { AnalyticsService } from '../services/analytics.service';

@Controller('analytics')
@ApiTags('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  @Inject() private readonly analyticsService: AnalyticsService;

  @Get('feedback')
  @ApiResponse({ type: GetFeedbackAnalyticsResponseDTO })
  async getFeedbackAnalytics(
    @Request() req: { user?: TJwtManager },
    @Query() query: GetFeedbackAnalyticsQueryDTO,
  ): Promise<GetFeedbackAnalyticsResponseDTO[]> {
    const institutionId = req.user!.institutionId;
    const result = await this.analyticsService.getFeedbackAnalytics({
      ...query,
      institutionId,
    });
    return result.map((item) => new GetFeedbackAnalyticsResponseDTO(item));
  }

  @Get('criterions')
  @ApiResponse({ type: GetCriterionsAnaliticsResponseDTO })
  async getCriterionsAnalitics(
    @Request() req: { user?: TJwtManager },
    @Query() query: GetCriterionsAnaliticsQueryDTO,
  ): Promise<GetCriterionsAnaliticsResponseDTO[]> {
    const institutionId = req.user!.institutionId;
    const result = await this.analyticsService.getCriterionsAnalitics({
      ...query,
      institutionId,
    });
    return result.map((item) => new GetCriterionsAnaliticsResponseDTO(item));
  }
}
