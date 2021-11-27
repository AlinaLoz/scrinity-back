import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Transform } from 'class-transformer';
import { isBoolean, IsBoolean, IsOptional, isBooleanString, isNumberString } from 'class-validator';
import { ERRORS } from '@libs/constants';

export function ApiPropertyBoolean({ isOptional }: { isOptional?: boolean } = {}) {
  const propertyOptions: ApiPropertyOptions = { type: Boolean, example: true };

  return applyDecorators(
    ...isOptional
      ? [IsOptional(), ApiPropertyOptional(propertyOptions)]
      : [ApiProperty(propertyOptions)],
    IsBoolean({ message: ERRORS.NOT_A_BOOLEAN }),
    Transform(({ value }) => {
      return (!isNumberString(value) && (isBooleanString(value) || isBoolean(value))) ? (value === 'true' || value === true) : value;
    }),
  );
}
