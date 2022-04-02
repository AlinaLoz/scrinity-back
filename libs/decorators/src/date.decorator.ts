import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsDateString, IsOptional } from 'class-validator';
import { ERRORS } from '@libs/constants';

type PropertyEnumParams = {
  isOptional?: boolean;
};

export function ApiPropertyDate({ isOptional }: PropertyEnumParams = {}): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const propertyOptions: ApiPropertyOptions = { type: String };

  return applyDecorators(
    ...(isOptional ? [IsOptional(), ApiPropertyOptional(propertyOptions)] : [ApiProperty(propertyOptions)]),
    IsDateString({ strict: true } as any, { message: ERRORS.INVALID_DATE_VALUE }),
  );
}
