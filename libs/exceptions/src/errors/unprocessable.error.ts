import { UnprocessableEntityException } from '@nestjs/common';
import { IAbstractError, ErrorDetail } from './abstract.error';

const defaultError = [
  {
    field: '',
    message: 'Unprocessable',
  },
];

export class UnprocessableError
  extends UnprocessableEntityException
  implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
