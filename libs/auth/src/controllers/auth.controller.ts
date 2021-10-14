import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async requestSmsCode(
    @Body() body: RequestSmsCodeBodyDTO,
  ): Promise<RequestSmsCodeResponseDTO> {
    const data = await this.authService.requestSmsCode(body);
    return data;
  }
}
