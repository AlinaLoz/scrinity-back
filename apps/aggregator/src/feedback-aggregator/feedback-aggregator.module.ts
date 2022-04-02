import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '@nestjs/schedule';
import { Controllers } from './controllers';
import { Services } from './services';
import { Repositories } from './repositories';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature(Repositories)],
  controllers: Controllers,
  providers: Services,
})
export class FeedbackAggregatorModule {}
