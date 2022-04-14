import { Controller, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AggregatorService } from '../services/aggregator.service';

@Controller()
export class AggregatorController implements OnModuleInit {
  constructor(private readonly aggregatorService: AggregatorService) {}

  onModuleInit(): void {
    this.aggregate();
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  private aggregate(): Promise<void> {
    return this.aggregatorService.aggregate();
  }
}
