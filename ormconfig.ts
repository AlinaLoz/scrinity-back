import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { POSTGRES } from "config";

import * as Migrations from './migrations';

// todo разобраться чего сохраняет не в нужную папку
export const DB_CONFIG = {
	type: 'postgres',
	host: POSTGRES.HOST,
	port: POSTGRES.PORT,
	username: POSTGRES.USERNAME,
	password: POSTGRES.PASSWORD,
	database: POSTGRES.DB,
	migrationsRun: false,
	migrations: Object.values(Migrations),
	synchronize: false,
	autoLoadEntities: true,
} as TypeOrmModuleOptions;

export default DB_CONFIG;
