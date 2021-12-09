import { Controller, Get, Inject, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  GetChatParamDTO,
  GetChatResponseDTO,
  GetChatsResponseDTO,
  LibChatService,
} from '@libs/chats';
import { ManagerGuard, TJwtManager } from '@libs/auth';
import { GetChatsQueryDTO } from '../dtos/chats.controller.dtos';

@Controller('chats')
@ApiTags('chats')
@UseGuards(ManagerGuard)
export class ChatsController {
  @Inject() private readonly chatsService: LibChatService;

  @Get('/')
  @ApiResponse({ type: GetChatsResponseDTO })
  async getChats(
    @Request() { user }: { user: TJwtManager },
      @Query() query: GetChatsQueryDTO,
  ): Promise<GetChatsResponseDTO> {
    return new GetChatsResponseDTO(await this.chatsService.getChats(user.institutionId, query));
  }

  @Get('/:id')
  @ApiResponse({ type: GetChatResponseDTO })
  async getChat(
  @Request() { user }: { user: TJwtManager },
    @Param() param: GetChatParamDTO,
  ) {
    return new GetChatResponseDTO({
      items: await this.chatsService.getChat({
        id: param.id,
        institutionId: user.institutionId,
      }),
    });
  }
}
