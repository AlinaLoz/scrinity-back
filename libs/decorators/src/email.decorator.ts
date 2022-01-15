import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

import { ERRORS } from '@libs/constants';

export function ApiPropertyEmail({ isOptional }: { isOptional?: boolean } = {}) {
  const propertyOptions: ApiPropertyOptions = { type: String, example: 'koko@ko.ko', description: 'Email' };

  return applyDecorators(
    ...isOptional
      ? [IsOptional(), ApiPropertyOptional(propertyOptions)]
      : [ApiProperty(propertyOptions)],
    IsEmail({}, { message: ERRORS.INVALID_EMAIL }),
    MaxLength(256, { message: ERRORS.TOO_LONG_STRING }),
  );
}
