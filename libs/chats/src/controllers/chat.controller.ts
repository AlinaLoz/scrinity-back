import { Body, Controller, Inject, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, TJwtUser } from '@libs/auth';
import { RESPONSE_STATUS, ResponsesDTO } from '@libs/dtos';

import { FEEDBACK_IMAGES_COUNT } from '@libs/constants';
import { ApiMultiFile, FilesService, imageFileFilter } from '@libs/files';
import { TMulterFile } from '@libs/files/types/files.types';
import { SendMessageBodyDTO, UploadFeedbackImagesResponseDTO } from '../dtos/chat.controller.dtos';
import { LibChatService } from '../services/chat.service';

@Controller('chats')
@ApiTags('chats')
export class ChatController {
  @Inject() private readonly chatService: LibChatService;
  @Inject() private readonly filesService: FilesService;

  @Post('/message')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Request() { user }: { user: TJwtUser }, @Body() body: SendMessageBodyDTO): Promise<ResponsesDTO> {
    await this.chatService.sendMessage({ ...body, user });
    return new ResponsesDTO({ status: RESPONSE_STATUS.OK });
  }

  @UseInterceptors(
    FilesInterceptor('images', FEEDBACK_IMAGES_COUNT, {
      fileFilter: imageFileFilter,
    }),
  )
  @Post('images')
  @ApiMultiFile('images')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: UploadFeedbackImagesResponseDTO })
  async uploadFeedbackImages(@UploadedFiles() files: TMulterFile[]): Promise<UploadFeedbackImagesResponseDTO> {
    const imagesKeys = await this.filesService.uploadImages(files);
    return new UploadFeedbackImagesResponseDTO({ imagesKeys });
  }
}
