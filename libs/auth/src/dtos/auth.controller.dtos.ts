import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

import { ResponsesDTO } from '@libs/dtos';
import { ERRORS, CONFIRM_CODE_LENGTH } from '@libs/constants';

export class RequestSmsCodeBodyDTO {
  @ApiProperty()
  @IsPhoneNumber('BY', { message: ERRORS.INVALID_PHONE_NUMBER })
  phoneNumber: string;
}

export class RequestSmsCodeResponseDTO extends ResponsesDTO {}

export class VerifyConfirmCodeBodyDTO extends RequestSmsCodeBodyDTO {
  @ApiProperty()
  @MinLength(CONFIRM_CODE_LENGTH, { message: ERRORS.CONFIRM_CODE_INVALID_LENGTH })
  @MaxLength(CONFIRM_CODE_LENGTH, { message: ERRORS.CONFIRM_CODE_INVALID_LENGTH })
  @IsString({ message: ERRORS.CONFIRM_CODE_INVALID_LENGTH })
  code: string;
}

export class VerifyConfirmCodeResponseDTO extends ResponsesDTO {}
