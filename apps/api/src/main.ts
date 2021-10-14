import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import CONFIG from 'config';

import { AppLogger } from '@libs/logger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const logger = new AppLogger('api.service');
  const app = await NestFactory.create(ApiModule, { logger });
  app.setGlobalPrefix('/api/v1');
  setupSwagger(app);
  await app.listen(CONFIG.API_PORT, () => {
    logger.log(`api port: ${CONFIG.API_PORT}`);
  });
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Project Z')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
