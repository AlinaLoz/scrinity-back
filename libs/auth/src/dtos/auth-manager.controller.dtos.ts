import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { ERRORS } from '@libs/constants';

export class SignInBodyDTO {
  
  @ApiProperty()
  @IsString({ message: ERRORS.INVALID_STRING })
  @MinLength(5, { message: ERRORS.STRING_IS_TOO_SHORT })
  @MaxLength(20, { message: ERRORS.STRING_IS_TOO_LONG })
  login: string;
  
  @ApiProperty()
  @IsString({ message: ERRORS.INVALID_STRING })
  @MinLength(5, { message: ERRORS.STRING_IS_TOO_SHORT })
  @MaxLength(20, { message: ERRORS.STRING_IS_TOO_LONG })
  password: string;
}
