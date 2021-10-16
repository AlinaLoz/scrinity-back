import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import DB_CONFIG from '../../../ormconfig';

console.log('DB_CONFIG', DB_CONFIG);
@Module({
  imports: [
    ExceptionModule,
    AuthModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
