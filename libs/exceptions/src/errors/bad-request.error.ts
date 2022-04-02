import { BadRequestException } from '@nestjs/common';
import { ErrorDetail, IAbstractError } from './abstract.error';

const defaultError = [
  {
    field: '',
    message: 'Bad Request',
  },
];

export class BadRequestError extends BadRequestException implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
