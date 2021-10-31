import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company, Feedback, FeedbackCriterion, FeedbackFile } from '@libs/entities';
import { FilesModule } from '@libs/files/files.module';

import { FeedbackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([
      Company,
      Feedback,
      FeedbackFile,
      FeedbackCriterion,
    ]),
  ],
})
export class FeedbackModule {}
