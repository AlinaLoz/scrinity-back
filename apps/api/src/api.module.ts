import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import DB_CONFIG from '../../../ormconfig';
import { InstitutionModule } from './institution/institution.module';
import { FeedbackModule } from './feedback/feedback.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ExceptionModule,
    AuthModule.register('api'),
    UserModule,
    InstitutionModule,
    FeedbackModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
})
export class ApiModule {}
