import { ApiPropertyNumber, ApiPropertyString } from '@libs/decorators';

export class SendMessageBodyDTO {
  @ApiPropertyNumber()
  chatId: number;

  @ApiPropertyString({ minLength: 1, maxLength: 1000 })
  message: string;
}
