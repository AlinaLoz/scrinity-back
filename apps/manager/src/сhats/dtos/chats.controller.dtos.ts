import { PaginationDTO } from '@libs/dtos';
import { ApiPropertyBoolean } from '@libs/decorators';

export class GetChatsQueryDTO extends PaginationDTO {
  @ApiPropertyBoolean({ isOptional: true })
  isAnonymously: boolean;
}
