import { UnprocessableEntityException } from '@nestjs/common';
import { IAbstractError, ErrorDetail } from './abstract.error';

const defaultError = [
  {
    field: '',
    message: 'Unprocessable',
  },
];

export class UnprocessableEntityError
  extends UnprocessableEntityException
  implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
