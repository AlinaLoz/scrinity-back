import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { HttpExceptionFilter } from './filters/exceptions.filter';
import { ClassValidationPipe } from './pipes/validation.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ClassValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ExceptionModule {}
