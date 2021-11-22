import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import DB_CONFIG from '../../../ormconfig';
import { ManagerModule as ManagerModuleSubModule } from './manager';

@Module({
  imports: [
    ExceptionModule,
    AuthModule.register('manager'),
    ManagerModuleSubModule,
    // InstitutionModule,
    // FeedbackModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
})
export class ManagerModule {}
