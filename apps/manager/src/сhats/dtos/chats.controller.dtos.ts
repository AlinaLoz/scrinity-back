import { PaginationDTO } from '@libs/dtos';
import { ApiPropertyEnum } from '@libs/decorators';

export enum CHAT_AUTH_TYPE {
  anonymously = 'anonymously',
  byNumber = 'byNumber',
  byEmail = 'byEmail',
}
export class GetChatsQueryDTO extends PaginationDTO {
  @ApiPropertyEnum(CHAT_AUTH_TYPE, { isOptional: true })
  authType: CHAT_AUTH_TYPE;
}
