import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageFile, Institution, Manager, Message, ChatCriterion, User } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';
import { ChatRepository, LibChatModule } from '@libs/chats';
// import { MailServiceModule } from '@libs/mail-service';

import { ChatsController } from './controllers/chats.controller';
import { ChatsService } from './services/chats.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [
    // MailServiceModule,
    FilesModule,
    LibChatModule,
    TypeOrmModule.forFeature([
      User,
      ChatCriterion,
      Message,
      Manager,
      Institution,
      MessageFile,
      ChatRepository,
    ]),
  ],
})
export class ChatModule {}
