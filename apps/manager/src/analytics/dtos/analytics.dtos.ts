import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ApiPropertyDate, ApiPropertyEnum } from '@libs/decorators';
import { ConstructableDTO } from '@libs/dtos';

export enum ANALYTIC_STEP {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export class GetFeedbackAnalyticsQueryDTO {
  @ApiPropertyDate()
  fromDate: string;

  @ApiPropertyDate()
  toDate: string;

  @ApiPropertyEnum(ANALYTIC_STEP)
  step: ANALYTIC_STEP;
}

export class GetCriterionsAnaliticsQueryDTO {
  @ApiPropertyDate()
  fromDate: string;

  @ApiPropertyDate()
  toDate: string;
}

export class FeedbackAnalyticsData extends ConstructableDTO<FeedbackAnalyticsData> {
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
  @Expose() data: FeedbackAnalyticsData[];
}

export class CriterionsAnalyticsData {
  @ApiProperty()
  @Expose() criterionKey: string;

  @ApiProperty()
  @Expose() value: number;
}

export class GetCriterionsAnaliticsResponseDTO extends ConstructableDTO<GetCriterionsAnaliticsResponseDTO> {
  @ApiProperty()
  @Expose() isGood: boolean;

  @ApiProperty({ type: CriterionsAnalyticsData })
  @Type(() => CriterionsAnalyticsData)
  @Expose() data: CriterionsAnalyticsData[];
}
