import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import CONFIG from 'config';

import { AppLogger } from '@libs/logger';
import { sentryService } from '@libs/exceptions/services/sentry.service';
import packageJson from '../package.json';

export async function bootstrap(service: string, application: object, port: number): Promise<void> {
  const logger = new AppLogger(service);
  const app = await NestFactory.create(application, { logger });
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
  setupSwagger(app, service);
  sentryService.init(service);
  await app.listen(port, () => {
    logger.log(`${service} port: ${port}`);
  });
}

function setupSwagger(app: INestApplication, service: string): void {
  if (!CONFIG.IS_OPEN_SWAGGER) {
    return;
  }
  const config = new DocumentBuilder().setTitle(`Documentation ${service}`).setVersion(packageJson.version).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
