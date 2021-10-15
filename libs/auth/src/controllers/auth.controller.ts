import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RESPONSE_STATUS } from '@libs/dtos';

import { AuthService } from '../services/auth.service';
import {
  RequestSmsCodeBodyDTO,
  RequestSmsCodeResponseDTO,
} from '../dtos/auth.controller.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-confirm-code')
  @ApiResponse({ type: RequestSmsCodeResponseDTO })
  async requestSmsCode(
    @Body() body: RequestSmsCodeBodyDTO,
  ): Promise<RequestSmsCodeResponseDTO> {
    const data = await this.authService.requestSmsCode(body);
    return new RequestSmsCodeResponseDTO({
      status: data ? RESPONSE_STATUS.OK : RESPONSE_STATUS.ERROR,
    });
  }
}
