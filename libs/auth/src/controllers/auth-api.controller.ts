import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { RESPONSE_STATUS } from '@libs/dtos';
import { AUTHORIZATION_COOKIE } from '@libs/constants';
import {
  RequestSmsCodeBodyDTO,
  RequestSmsCodeResponseDTO,
  VerifyConfirmCodeBodyDTO,
  VerifyConfirmCodeResponseDTO,
} from '../dtos/auth.controller.dtos';
import { prepareCookiesOptions, SAME_SITE_OPTIONS } from '../helpers/cookies.helpers';
import { AuthApiService } from '../services/auth-api.service';

@ApiTags('auth')
@Controller('auth')
export class AuthApiController {
  constructor(private readonly authService: AuthApiService) {}

  @Post('request-confirm-code')
  @ApiResponse({ type: RequestSmsCodeResponseDTO })
  async requestConfirmCode(
    @Body() body: RequestSmsCodeBodyDTO,
  ): Promise<RequestSmsCodeResponseDTO> {
    const data = await this.authService.requestSmsCode(body);
    return new RequestSmsCodeResponseDTO({
      status: data ? RESPONSE_STATUS.OK : RESPONSE_STATUS.ERROR,
    });
  }

  @Post('verify-confirm-code')
  @ApiResponse({ type: VerifyConfirmCodeResponseDTO })
  async verifyConfirmCode(
    @Body() body: VerifyConfirmCodeBodyDTO,
      @Res() res: Response,
  ): Promise<void> {
    const token = await this.authService.verifyConfirmCode(body);
    res.cookie(AUTHORIZATION_COOKIE, token, prepareCookiesOptions());
    res.send(new VerifyConfirmCodeResponseDTO({ status: RESPONSE_STATUS.OK }));
  }

  @Post('sign-out')
  signOut(
    @Res() res: Response,
  ): void {
    res.clearCookie(AUTHORIZATION_COOKIE, SAME_SITE_OPTIONS);
    res.send(new VerifyConfirmCodeResponseDTO({ status: RESPONSE_STATUS.OK }));
  }
}
