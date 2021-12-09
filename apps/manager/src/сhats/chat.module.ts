import { LibChatModule } from '@libs/chats';
import { Module } from '@nestjs/common';

import * as Controllers from './controllers';

@Module({
  imports: [
    LibChatModule,
  ],
  controllers: Object.values(Controllers),
})
export class ChatModule {}
