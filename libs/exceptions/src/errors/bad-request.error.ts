import { ErrorDetail, IAbstractError } from './abstract.error';
import { BadRequestException } from '@nestjs/common';

const defaultError = [
  {
    field: '',
    message: 'Bad Request',
  },
];

export class BadRequestError
  extends BadRequestException
  implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
