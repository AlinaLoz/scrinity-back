import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

import { BadRequestError } from '../errors';
import { ErrorDetail } from '../errors/abstract.error';

export class ClassValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = metadata.metatype
      ? plainToClass(metadata.metatype, value)
      : [];
    const errors = await validate(object);

    if (errors.length > 0) {
      const details: ErrorDetail[] = [];
      errors.forEach(({ property, constraints }) => {
        constraints &&
          Object.keys(constraints).forEach((key) => {
            details.push({
              field: property,
              message: constraints[key].replace(property, '').trim(),
            });
          });
      });
      throw new BadRequestError(details);
    }

    return object;
  }
}
