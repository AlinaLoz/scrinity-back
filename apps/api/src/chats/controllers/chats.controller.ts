import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { TJwtUser, JwtAuthGuard, Public, TJwtManager, ChatEndpoint } from '@libs/auth';
import { RESPONSE_STATUS } from '@libs/dtos';
import { FEEDBACK_IMAGES_COUNT } from '@libs/constants';
import { ApiMultiFile, FilesService, imageFileFilter } from '@libs/files';

import {
  GetChatsQueryDTO, GetInfoByLinkQueryDTO,
  GetInfoByLinkResponseDTO, SendFeedbackBodyDTO, SendFeedbackResponseDTO,
} from '../dtos/chats.controller.dtos';
import { ChatsService } from '../services/chats.service';
import { TMulterFile } from '@libs/files/types/files.types';
import { GetChatParamDTO, GetChatResponseDTO, GetChatsResponseDTO, UploadFeedbackImagesResponseDTO } from '@libs/chats';

@Controller('chats')
@ApiTags('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;
  @Inject() private readonly filesService: FilesService;

  @Post('/')
  @Public()
  @ChatEndpoint()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: SendFeedbackResponseDTO })
  async sendFeedback(
    @Request() { user }: { user?: TJwtUser },
      @Body() body: SendFeedbackBodyDTO,
  ): Promise<SendFeedbackResponseDTO> {
    await this.chatsService.sendFeedback({
      ...body,
      ...(user && { userId: user.userId }),
    });
    return new SendFeedbackResponseDTO({ status: RESPONSE_STATUS.OK });
  }

  @UseInterceptors(FilesInterceptor('images', FEEDBACK_IMAGES_COUNT, {
    fileFilter: imageFileFilter,
  }))
  @Post('images')
  @ApiMultiFile('images')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: UploadFeedbackImagesResponseDTO })
  async uploadFeedbackImages(
    @UploadedFiles() files: TMulterFile[],
  ): Promise<UploadFeedbackImagesResponseDTO> {
    const imagesKeys = await this.filesService.uploadImages(files);
    return new UploadFeedbackImagesResponseDTO({ imagesKeys });
  }

  @Get('/')
  @ApiResponse({ type: GetInfoByLinkResponseDTO })
  async getInfoByLink(
    @Query() query: GetInfoByLinkQueryDTO,
  ): Promise<GetInfoByLinkResponseDTO> {
    return new GetInfoByLinkResponseDTO(await this.chatsService.getInfoByLink(query.link));
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: GetChatsResponseDTO })
  async getChats(
    @Request() { user }: { user: TJwtManager },
      @Query() query: GetChatsQueryDTO,
  ): Promise<GetChatsResponseDTO> {
    return new GetChatsResponseDTO(await this.chatsService.getChats(query.institutionId, {
      ...query,
      userId: user.userId,
    }, user.userId));
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: GetChatResponseDTO })
  async getChat(
  @Request() { user }: { user: TJwtUser },
    @Param() param: GetChatParamDTO,
  ) {
    return new GetChatResponseDTO({
      items: await this.chatsService.getChat({
        id: param.id,
        userId: user.userId,
      }),
    });
  }
}
