import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Injectable } from '@nestjs/common';
import config from 'config';

import { sentryService } from '@libs/exceptions/services/sentry.service';
import { AppLogger } from '@libs/logger';

axiosRetry(axios, { retries: 3 });

@Injectable()
export class AxiosPageFetcherService {
  private localLogger = new AppLogger(AxiosPageFetcherService.name);

  async getPageContent<T>(url: string, withProxy = true): Promise<T | null> {
    try {
      const { data } = await axios.get(url, {
        ...(withProxy && {
          proxy: {
            protocol: config.PROXY.PROTOCOL,
            host: config.PROXY.HOST,
            port: config.PROXY.PORT,
            auth: {
              username: config.PROXY.USERNAME,
              password: config.PROXY.PASSWORD,
            },
          },
        }),
      });
      return data;
    } catch (err) {
      this.localLogger.error(`error get page - ${url}: ${JSON.stringify(err)}`);
      sentryService.error(`error get page - ${url}: ${JSON.stringify(err)}`);
      return null;
    }
  }
}
