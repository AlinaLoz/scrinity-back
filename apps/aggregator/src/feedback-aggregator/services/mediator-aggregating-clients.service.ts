import { Injectable } from '@nestjs/common';

import { AGGREGATION_TYPE, PLATFORM_AGGREGATORS } from '../constants/aggregator.constants';
import { UNSUPPORTED_PUBLIC_PLATFORM } from '../constants/aggregator.errors';
import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';
import { YandexApiService } from './yandex-api.service';
import { YandexParserService } from './yandex-parser.service';

@Injectable()
export class MediatorAggregatingClientsService {
  constructor(
    private readonly yandexParser: YandexParserService,
    private readonly yandexApiService: YandexApiService,
  ) {}

  getClient(platform: PLATFORM_AGGREGATORS, aggregationType: AGGREGATION_TYPE): IClientAggregations {
    switch (platform) {
      case PLATFORM_AGGREGATORS.YANDEX:
        if (aggregationType === AGGREGATION_TYPE.API) {
          return this.yandexApiService;
        }
        return this.yandexParser;
      default:
        throw new Error(UNSUPPORTED_PUBLIC_PLATFORM);
    }
  }
}
