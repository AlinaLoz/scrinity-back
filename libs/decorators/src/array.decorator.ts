import { applyDecorators, Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsArray, IsOptional } from 'class-validator';
import { ERRORS } from '@libs/constants';

class PropertyArrayParams {
  isOptional?: boolean;
  isNotEmpty?: boolean;
  isUnique?: boolean;
  type: Type<unknown> | string | Record<string, any>;
  enumValue?: any[] | Record<string, any>;
  maxSize?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export function ApiPropertyArray({ isOptional, isNotEmpty, isUnique, type, enumValue, maxSize }: PropertyArrayParams) {
  const propertyOptions: ApiPropertyOptions = {
    isArray: true,
    type,
    ...(enumValue && { enum: enumValue }),
  };

  return applyDecorators(
    ...isOptional
      ? [IsOptional(), ApiPropertyOptional(propertyOptions)]
      : [ApiProperty(propertyOptions)],
    IsArray({ message: ERRORS.FIELD_MUST_BE_AN_ARRAY }),
    ...isNotEmpty ? [ArrayNotEmpty({ message: ERRORS.ARRAY_EMPTY })] : [],
    ...isUnique ? [ArrayUnique({ message: ERRORS.ARRAY_MUST_BE_UNIQUE })] : [],
    ...maxSize
      ? [ArrayMaxSize(maxSize, { message: ERRORS.ARRAY_INVALID_SIZE, context: { maxSize } })]
      : [],
  );
}
