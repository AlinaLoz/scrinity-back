import { Injectable } from '@nestjs/common';
import { AGGREGATION_TYPE, PLATFORM_AGGREGATORS } from '@libs/constants';
import { UNSUPPORTED_PUBLIC_PLATFORM } from '@libs/constants/errors';

import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';
import { YandexApiService } from './yandex.services/api.service';
import { YandexParserService } from './yandex.services/parser.service';

@Injectable()
export class MediatorAggregatingClientsService {
  constructor(
    private readonly yandexParserService: YandexParserService,
    private readonly yandexApiService: YandexApiService,
  ) {}

  getClient(platform: PLATFORM_AGGREGATORS, aggregationType: AGGREGATION_TYPE): IClientAggregations {
    switch (platform) {
      case PLATFORM_AGGREGATORS.YANDEX:
        if (aggregationType === AGGREGATION_TYPE.API) {
          return this.yandexApiService;
        }
        return this.yandexParserService;
      default:
        throw new Error(UNSUPPORTED_PUBLIC_PLATFORM);
    }
  }
}
