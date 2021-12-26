import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Manager, Message, User } from '@libs/entities';
import { LibChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { ChatRepository } from './repositories';
import { FilesModule } from '@libs/files/files.module';

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([
      User,
      Message,
      Manager,
      ChatRepository,
    ]),
  ],
  controllers: [ChatController],
  providers: [LibChatService],
  exports: [LibChatService],
})
export class LibChatModule {}
