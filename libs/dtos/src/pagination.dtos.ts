import { ApiPropertyNumber } from '@libs/decorators';

export class PaginationDTO {
  @ApiPropertyNumber({ min: 0, isOptional: true })
  skip: number;

  @ApiPropertyNumber({ min: 0, isOptional: true })
  limit: number;
}
