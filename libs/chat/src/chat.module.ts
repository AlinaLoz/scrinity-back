import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat, Manager, Message, User } from '@libs/entities';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Message,
      Manager,
      Chat,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class LibChatModule {}
