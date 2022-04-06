import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NODE_CONFIG_ENV, POSTGRES } from 'config';

import * as Entities from '@libs/entities';
import * as Migrations from './migrations';

const entities = Object.values(Entities);
const migrations = Object.values(Migrations);

console.log('__dirname + \'/migrations\'', __dirname + '/migrations');
export const DB_CONFIG = {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DB,
  migrationsRun: false,
  synchronize: true,
  autoLoadEntities: true,
  entities,
  migrations,
  logging: NODE_CONFIG_ENV === 'local',
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
} as TypeOrmModuleOptions;
