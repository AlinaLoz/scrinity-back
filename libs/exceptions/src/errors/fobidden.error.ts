import { ErrorDetail, IAbstractError } from './abstract.error';
import { ForbiddenException } from '@nestjs/common';

const defaultError = [
  {
    field: '',
    message: 'Forbidden Exception',
  },
];

export class ForbiddenError
  extends ForbiddenException
  implements IAbstractError {
  constructor(public readonly details: ErrorDetail[] = defaultError) {
    super();
  }
}
