import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import { DB_CONFIG } from '../../../ormconfig';
import { ManagerModule as ManagerModuleSubModule } from './manager';
import { ChatModule } from './сhats/chat.module';
import { WebPushModule } from './web-push/web-push.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ExceptionModule,
    AuthModule.register('manager'),
    ManagerModuleSubModule,
    ChatModule,
    AnalyticsModule,
    // InstitutionModule,
    // ChatModule,
    WebPushModule,
    FeedbackModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
})
export class ManagerModule {}
