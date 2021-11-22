import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat, MessageFile, Institution, Manager, Message, ChatCriterion } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';

import { FeedbackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([
      ChatCriterion,
      Message,
      Manager,
      Institution,
      Chat,
      MessageFile,
    ]),
  ],
})
export class FeedbackModule {}
