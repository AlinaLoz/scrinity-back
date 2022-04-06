import { Injectable } from '@nestjs/common';

import { IClientAggregations } from '../interfaces/client-aggregation.intefaces';

@Injectable()
export class YandexApiService implements IClientAggregations {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  aggregate(data: { institutionId: number; url: string; platformId: number }): Promise<void> {
    return Promise.resolve(undefined);
  }
}
