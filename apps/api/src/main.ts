import { NestFactory } from '@nestjs/core';
import CONFIG from 'config';

import { AppLogger } from 'libs/logger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const logger = new AppLogger('api.service');
  const app = await NestFactory.create(ApiModule, { logger });
  app.setGlobalPrefix('/api/v1');
  await app.listen(CONFIG.API_PORT, () => {
    logger.log(`api port: ${CONFIG.API_PORT}`);
  });
}
bootstrap();
