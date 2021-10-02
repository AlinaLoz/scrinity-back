import { NestFactory } from '@nestjs/core';
import CONFIG from 'config';

import { AppLogger } from 'libs/logger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    logger: new AppLogger('api.service'),
  });
  await app.listen(CONFIG.API_PORT);
}
bootstrap();
