import { UnauthorizedException } from '@nestjs/common';
import { IAbstractError, ErrorDetail } from './abstract.error';

const defaultError = [
  {
    field: '',
    message: 'Unauthorized',
  },
];

export class UnauthorizedError
  extends UnauthorizedException
  implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
