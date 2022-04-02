import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AUTHORIZATION_COOKIE } from '@libs/constants';

import { prepareCookiesOptions } from '../helpers/cookies.helpers';
import { SignInBodyDTO } from '../dtos/auth-manager.controller.dtos';
import { AuthManagerService } from '../services/auth-manager.service';

@ApiTags('auth')
@Controller('auth')
export class AuthManagerController {
  constructor(private readonly authService: AuthManagerService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInBodyDTO, @Res() res: Response): Promise<void> {
    const token = await this.authService.signIn(body);
    res.cookie(AUTHORIZATION_COOKIE, token, prepareCookiesOptions());
    res.send();
  }

  @Post('sign-out')
  signOut(@Res() res: Response): void {
    res.clearCookie(AUTHORIZATION_COOKIE, prepareCookiesOptions());
    res.send();
  }
}
