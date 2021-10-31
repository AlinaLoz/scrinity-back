import { Body, Controller, Inject, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { TJwtUser, JwtAuthGuard, Public } from '@libs/auth';
import { RESPONSE_STATUS } from '@libs/dtos';
import { FEEDBACK_IMAGES_COUNT, DEFAULT_MULTER_FILE_SIZE_LIMIT_MB } from '@libs/constants';
import { ApiMultiFile, FilesService, imageFileFilter } from '@libs/files';

import { SendFeedbackBodyDTO, SendFeedbackResponseDTO, UploadFeedbackImagesResponseDTO } from '../dtos/feedback.controller.dtos';
import { FeedbackService } from '../services/feedback.service';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  @Inject() private readonly feedbackService: FeedbackService;
  @Inject() private readonly filesService: FilesService;

  @Post('/')
  @Public()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: SendFeedbackResponseDTO })
  async sendFeedback(
    @Request() { user }: { user?: TJwtUser },
      @Body() body: SendFeedbackBodyDTO,
  ): Promise<SendFeedbackResponseDTO> {
    await this.feedbackService.sendFeedback({
      ...body,
      ...(user && { userId: user.userId }),
    });
    return new SendFeedbackResponseDTO({ status: RESPONSE_STATUS.OK });
  }

  @UseInterceptors(FilesInterceptor('images', FEEDBACK_IMAGES_COUNT, {
    limits: {
      fileSize: DEFAULT_MULTER_FILE_SIZE_LIMIT_MB,
    },
    fileFilter: imageFileFilter,
  }))
  @Post('images')
  @ApiMultiFile('images')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: UploadFeedbackImagesResponseDTO })
  async uploadFeedbackImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadFeedbackImagesResponseDTO> {
    const imagesKeys = await this.filesService.uploadImages(files);
    return new UploadFeedbackImagesResponseDTO({ imagesKeys });
  }
}
