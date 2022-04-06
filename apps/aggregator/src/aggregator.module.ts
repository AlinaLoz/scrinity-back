import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExceptionModule } from '@libs/exceptions';

import { DB_CONFIG } from '../../../ormconfig';
import { FeedbackAggregatorModule } from './feedback-aggregator/feedback-aggregator.module';

@Module({
  imports: [
    ExceptionModule,
    FeedbackAggregatorModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: false,
    }),
  ],
})
export class AggregatorModule {}
