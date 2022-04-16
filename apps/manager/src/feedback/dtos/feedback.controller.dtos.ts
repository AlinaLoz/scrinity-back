import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConstructableDTO, PaginationDTO } from '@libs/dtos';
import { ApiPropertyEnum } from '@libs/decorators';
import { FeedbackEntity } from '@libs/entities';
import { PLATFORM_AGGREGATORS } from '@libs/constants';

export class GetFeedbacksBodyDTO extends PaginationDTO {
  @ApiPropertyEnum(PLATFORM_AGGREGATORS)
  key: PLATFORM_AGGREGATORS;
}

export class FeedbackDTO
  // eslint-disable-next-line prettier/prettier
  implements Pick<FeedbackEntity, 'id' | 'icon' | 'author' | 'profession' | 'date' | 'text' | 'rating'> {
  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty()
  @Expose()
  icon: string;

  @ApiProperty()
  @Expose()
  id: number;

  @Expose()
  text: string;

  @ApiProperty()
  @Expose()
  profession: string;

  @ApiProperty()
  @Expose()
  rating: number;

  @ApiProperty()
  @Expose()
  author: string;
}

export class GetFeedbacksResponseDTO extends ConstructableDTO<GetFeedbacksResponseDTO> {
  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty({ type: FeedbackDTO, isArray: true })
  @Type(() => FeedbackDTO)
  @Expose()
  items: FeedbackDTO[];
}
