import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibChatModule } from '@libs/chat';
import * as Controllers from './controllers';
import * as Services from './services';
import * as Repositories from './repositories';

@Module({
  imports: [
    LibChatModule,
    TypeOrmModule.forFeature([
      ...Object.values(Repositories),
    ]),
  ],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class ChatModule {}
