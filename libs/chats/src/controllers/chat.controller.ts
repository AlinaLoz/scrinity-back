import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtUser } from '@libs/auth';
import { RESPONSE_STATUS, ResponsesDTO } from '@libs/dtos';

import { LibChatService } from '../services/chat.service';
import { SendMessageBodyDTO } from '../dtos/chat.controller.dtos';

@Controller('chats')
@ApiTags('chats')
export class ChatController {
  @Inject() private readonly chatService: LibChatService;

  @Post('/message')
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Request() { user }: { user: TJwtUser },
      @Body() body: SendMessageBodyDTO,
  ): Promise<ResponsesDTO> {
    await this.chatService.sendMessage({ ...body, user });
    return new ResponsesDTO({ status: RESPONSE_STATUS.OK });
  }
}
