import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import CONFIG from 'config';

import { AppLogger } from '@libs/logger';
import packageJson from '../../../package.json';
import { ManagerModule } from './manager.module';

async function bootstrap(): Promise<void> {
  const logger = new AppLogger('manager.service');
  const app = await NestFactory.create(ManagerModule, { logger });
  app.setGlobalPrefix('/api/v1');
  app.use(helmet());
  const corsOptions: CorsOptions = {
    origin: (origin, callback): void => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: ['x-user', 'X-Signature', 'accept', 'content-type', 'authorization'],
  };
  app.use(cookieParser());
  app.use(cors(corsOptions));
  setupSwagger(app);
  await app.listen(CONFIG.MANAGER_PORT, () => {
    logger.log(`api port: ${CONFIG.MANAGER_PORT}`);
  });
}
bootstrap();

function setupSwagger(app: INestApplication): void {
  if (!CONFIG.IS_OPEN_SWAGGER) {
    return;
  }
  const config = new DocumentBuilder().setTitle('Documentation Manager').setVersion(packageJson.version).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
