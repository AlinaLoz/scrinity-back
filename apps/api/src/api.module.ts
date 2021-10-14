import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import DB_CONFIG from '../../../ormconfig';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(DB_CONFIG)],
  controllers: [],
  providers: [],
})
export class ApiModule {}
