import { Module } from '@nestjs/common';

import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from './repositories/analytics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalyticsRepository,
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [],
})
export class AnalyticsModule {}
