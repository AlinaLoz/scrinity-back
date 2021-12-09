import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat, MessageFile, Institution, Manager, Message, ChatCriterion, User } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';
import { LibChatModule } from '@libs/chat';
import { MailServiceModule } from '@libs/mail-service';

import { ChatsController } from './controllers/chats.controller';
import { ChatsService } from './services/chats.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [
    MailServiceModule,
    FilesModule,
    LibChatModule,
    TypeOrmModule.forFeature([
      User,
      ChatCriterion,
      Message,
      Manager,
      Institution,
      Chat,
      MessageFile,
    ]),
  ],
})
export class ChatModule {}
