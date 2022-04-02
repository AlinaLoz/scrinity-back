import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorDetail, IAbstractError } from '../errors/abstract.error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status >= 400 && status < 500) {
        const errors: ErrorDetail[] = this.instanceOfAbstractError(exception)
          ? exception.details
          : [{ field: '', message: exception.message }];
        response.status(status).json({ status, errors });
        return;
      }
    }
    response.status(500).json({ status: 500, errors: 'Internal Server Error' });
  }

  private instanceOfAbstractError(object: any): object is IAbstractError {
    return typeof object === 'object' && object !== null && 'details' in object;
  }
}
