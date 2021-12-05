import { Controller, Get, Inject, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerGuard, TJwtManager } from '@libs/auth';
import {
  GetChatParamDTO,
  GetChatResponseDTO,
  GetChatsResponseDTO,
  GetPaginationQueryDTO,
} from '../dtos/chat.controller.dtos';
import { ChatsService } from '../services';

@Controller('chats')
@ApiTags('chats')
@UseGuards(ManagerGuard)
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('/')
  @ApiResponse({ type: GetChatsResponseDTO })
  async getChats(
    @Request() { user }: { user: TJwtManager },
      @Query() query: GetPaginationQueryDTO,
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
      items: await this.chatsService.getChat(user.institutionId, param.id),
    });
  }
}
