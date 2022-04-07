import axios from 'axios';
import config from 'config';
import { sentryService } from '@libs/exceptions/services/sentry.service';
import { AppLogger } from '@libs/logger';

// @Injectable()
export class BaseParserService {
  private localLogger = new AppLogger(BaseParserService.name);

  protected async getPageContent(url: string): Promise<Buffer | null> {
    try {
      const { data } = await axios.get(url, {
        proxy: {
          protocol: config.PROXY.PROTOCOL,
          host: config.PROXY.HOST,
          port: config.PROXY.PORT,
          auth: {
            username: config.PROXY.USERNAME,
            password: config.PROXY.PASSWORD,
          },
        },
      });
      return data;
    } catch (err) {
      this.localLogger.error(`error get page - ${url}: ${JSON.stringify(err)}`);
      sentryService.message(`error get page - ${url}: ${JSON.stringify(err)}`);
      return null;
    }
  }
}
