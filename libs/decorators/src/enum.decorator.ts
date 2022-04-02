import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEnum, IsOptional } from 'class-validator';
import { ERRORS } from '@libs/constants';

type PropertyEnumParams = {
  isOptional?: boolean;
};

export function ApiPropertyEnum<TValues extends Record<string, any>>(
  values: TValues,
  { isOptional }: PropertyEnumParams = {},
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const propertyOptions: ApiPropertyOptions = { type: 'enum', enum: values };

  return applyDecorators(
    ...(isOptional ? [IsOptional(), ApiPropertyOptional(propertyOptions)] : [ApiProperty(propertyOptions)]),
    IsEnum(values, { message: ERRORS.INVALID_ENUM_VALUE, context: values }),
  );
}
