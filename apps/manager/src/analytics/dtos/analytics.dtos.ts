import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ApiPropertyDate, ApiPropertyEnum } from '@libs/decorators';
import { ConstructableDTO } from '@libs/dtos';

export enum ANALYTIC_STEP {
  DAY,
  WEEK,
  MONTH,
  YEAR
}

export class GetFeedbackAnalyticsQueryDTO {
  @ApiPropertyDate()
  fromDate: string;

  @ApiPropertyDate()
  toDate: string;

  @ApiPropertyEnum(ANALYTIC_STEP)
  step: ANALYTIC_STEP;
}

class FeedbackAnalyticsData extends ConstructableDTO<FeedbackAnalyticsData> {
  @ApiProperty()
  @Expose() date: string;

  @ApiProperty()
  @Expose() value: number;
}

export class GetFeedbackAnalyticsResponseDTO extends ConstructableDTO<GetFeedbackAnalyticsResponseDTO> {
  @ApiProperty()
  @Expose() isGood: boolean;

  @ApiProperty({ type: FeedbackAnalyticsData })
  @Type(() => FeedbackAnalyticsData)
  @Expose() data: FeedbackAnalyticsData;
}
