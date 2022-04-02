import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ERRORS } from '@libs/constants';

class ApiPropertyNumberParams {
  isOptional?: boolean;
  min?: number;
  max?: number;
  each?: boolean;
}

export function ApiPropertyNumber({ isOptional, min, max, each }: ApiPropertyNumberParams = {}): <
  TFunction extends Function,
  Y,
>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const propertyOptions: ApiPropertyOptions = {
    type: Number,
    example: each ? [1, 2, 3] : 1,
    isArray: each,
    ...(min ? [{ minimum: min }] : []),
    ...(max ? [{ maximum: max }] : []),
  };

  return applyDecorators(
    ...(isOptional ? [IsOptional(), ApiPropertyOptional(propertyOptions)] : [ApiProperty(propertyOptions)]),
    IsInt({ message: ERRORS.NOT_AN_INTEGER, each }),
    Type(() => Number),
    ...(min && !isNaN(min)
      ? [Min(min, { message: ERRORS.INVALID_LIMIT_VALUE, context: { minValue: min }, each })]
      : []),
    ...(max && !isNaN(max)
      ? [Max(max, { message: ERRORS.INVALID_LIMIT_VALUE, context: { maxValue: max }, each })]
      : []),
  );
}
