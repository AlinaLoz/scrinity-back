import { NotFoundException } from '@nestjs/common';
import { IAbstractError, ErrorDetail } from './abstract.error';

const defaultError = [
  {
    field: '',
    message: 'Not Found',
  },
];

export class NotFoundError extends NotFoundException implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
