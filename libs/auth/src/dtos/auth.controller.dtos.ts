import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

import { ResponsesDTO } from '@libs/dtos';
import { ERRORS } from '@libs/constants';

export class RequestSmsCodeBodyDTO {
  @ApiProperty()
  @IsPhoneNumber('BY', { message: ERRORS.INVALID_PHONE_NUMBER })
  phoneNumber: string;
}

export class RequestSmsCodeResponseDTO extends ResponsesDTO {}
