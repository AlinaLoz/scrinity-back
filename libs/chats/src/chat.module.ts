import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Manager, User } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';
import { MailServiceModule } from '@libs/mail-service';

import { LibChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { ChatRepository, MessageRepository } from './repositories';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    FilesModule,
    MailServiceModule,
    TypeOrmModule.forFeature([
      User,
      Manager,
      ChatRepository,
      MessageRepository,
    ]),
  ],
  controllers: [ChatController],
  providers: [LibChatService, NotificationService],
  exports: [LibChatService, NotificationService],
})
export class LibChatModule {}
