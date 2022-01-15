import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@libs/auth';
import { ExceptionModule } from '@libs/exceptions';
import { ConfigModule } from '@libs/config';

import DB_CONFIG from '../../../ormconfig';
import { InstitutionModule } from './institution/institution.module';
import { ChatModule } from './chats/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ExceptionModule,
    AuthModule.register('api'),
    UserModule,
    InstitutionModule,
    ChatModule,
    ConfigModule,
    TypeOrmModule.forRoot({
      ...DB_CONFIG,
      migrationsRun: true,
    }),
  ],
})
export class ApiModule {}
