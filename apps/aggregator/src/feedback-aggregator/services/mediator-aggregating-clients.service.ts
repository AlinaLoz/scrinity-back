import { Injectable } from '@nestjs/common';

import { AGGREGATION_TYPE, PLATFORM_AGGREGATORS } from '@libs/constants';
import { UNSUPPORTED_PUBLIC_PLATFORM } from '@libs/constants/errors';

import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';
import { YandexApiService } from './yandex.services/api.service';
import { YandexParserService } from './yandex.services/parser.service';

import { RelaxApiService } from './relax.services/api.service';
import { GoogleParserService } from './google/parser.service';

@Injectable()
export class MediatorAggregatingClientsService {
  constructor(
    private readonly yandexParserService: YandexParserService,
    private readonly yandexApiService: YandexApiService,
    private readonly relaxApiService: RelaxApiService,
    private readonly googleParserService: GoogleParserService,
  ) {}

  getClient(platform: PLATFORM_AGGREGATORS, aggregationType: AGGREGATION_TYPE): IClientAggregations {
    switch (platform) {
      case PLATFORM_AGGREGATORS.YANDEX:
        if (aggregationType === AGGREGATION_TYPE.API) {
          return this.yandexApiService;
        }
        return this.yandexParserService;
      case PLATFORM_AGGREGATORS.RELAX:
        if (aggregationType === AGGREGATION_TYPE.API) {
          return this.relaxApiService;
        }
        throw new Error(UNSUPPORTED_PUBLIC_PLATFORM);
      case PLATFORM_AGGREGATORS.GOOGLE:
        if (aggregationType === AGGREGATION_TYPE.API) {
          throw new Error(UNSUPPORTED_PUBLIC_PLATFORM);
        }
        return this.googleParserService;
      default:
        throw new Error(UNSUPPORTED_PUBLIC_PLATFORM);
    }
  }
}
