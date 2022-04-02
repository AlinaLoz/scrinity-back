import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageFile, Institution, Manager, Message, ChatCriterion, User } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';
import { ChatRepository, LibChatModule } from '@libs/chats';
import { LibWebPushModule } from '@libs/web-push';
import { AuthModule } from '@libs/auth';

import { ChatsController } from './controllers/chats.controller';
import { ChatsService } from './services/chats.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [
    AuthModule.register('api'),
    LibWebPushModule,
    FilesModule,
    LibChatModule,
    TypeOrmModule.forFeature([User, ChatCriterion, Message, Manager, Institution, MessageFile, ChatRepository]),
  ],
})
export class ChatModule {}
