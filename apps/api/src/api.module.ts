import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import DB_CONFIG from '../../../ormconfig';

@Module({
  imports: [ExceptionModule, AuthModule, TypeOrmModule.forRoot(DB_CONFIG)],
  controllers: [],
  providers: [],
})
export class ApiModule {}
