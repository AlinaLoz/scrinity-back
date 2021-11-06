import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import DB_CONFIG from '../../../ormconfig';
import { CompaniesModule } from './companies/companies.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UserModule } from './user/user.module';

// console.log('DB_CONFIG', DB_CONFIG);
@Module({
  imports: [
    ExceptionModule,
    AuthModule,
    UserModule,
    CompaniesModule,
    FeedbackModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
})
export class ApiModule {}
