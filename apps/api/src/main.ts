import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import CONFIG from 'config';
import helmet from 'helmet';
import cors from 'cors';

import { AppLogger } from '@libs/logger';
import { ApiModule } from './api.module';
import packageJson from '../../../package.json';

async function bootstrap() {
  const logger = new AppLogger('api.service');
  const app = await NestFactory.create(ApiModule, { logger });
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
<<<<<<< HEAD
=======
  app.use(helmet());
  const corsOptions = {
    origin: (origin: string, callback: (data: null, value: boolean) => void): void => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
    headers: ['x-user', 'X-Signature', 'accept', 'content-type', 'authorization'],
  };
  app.use(cors(corsOptions));

>>>>>>> 6c0df1c64e6a79542a5516976f05dbbabfb42e60
  setupSwagger(app);
  await app.listen(CONFIG.API_PORT, () => {
    logger.log(`api port: ${CONFIG.API_PORT}`);
  });
}
bootstrap();

function setupSwagger(app: INestApplication): void {
  if (!CONFIG.IS_OPEN_SWAGGER) {
    return;
  }
  const config = new DocumentBuilder()
    .setTitle('Documentation API')
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
