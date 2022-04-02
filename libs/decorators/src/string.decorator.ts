import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { ERRORS } from '@libs/constants';

type PropertyStringParams = {
  isOptional?: boolean;
  minLength?: number;
  maxLength?: number;
  example?: string;
};

export function ApiPropertyString({ isOptional, minLength = 0, maxLength = 0, example }: PropertyStringParams = {}): <
  TFunction extends Function,
  Y,
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const propertyOptions: ApiPropertyOptions = {
    type: String,
    example,
    minLength,
    ...(maxLength ? [{ maxLength }] : []),
  };

  return applyDecorators(
    ...(isOptional ? [IsOptional(), ApiPropertyOptional(propertyOptions)] : [ApiProperty(propertyOptions)]),
    MinLength(minLength, { message: ERRORS.STRING_LENGTH_IS_TOO_SHORT, context: { minLength } }),
    ...(!isNaN(maxLength)
      ? [MaxLength(maxLength, { message: ERRORS.STRING_LENGTH_IS_TOO_LONG, context: { maxLength } })]
      : []),
  );
}
