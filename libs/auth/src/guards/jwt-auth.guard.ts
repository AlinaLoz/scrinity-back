import { AUTHORIZATION_COOKIE } from '@libs/constants';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CHAT_LINK_CHANNEL } from 'config';

import { IS_CHAT_ENDPOINT, IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { LINK_CHANNEL } from '@libs/dtos';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request['cookies'][AUTHORIZATION_COOKIE];
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isChatEndpoint = this.reflector.getAllAndOverride<boolean>(IS_CHAT_ENDPOINT, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isEmailAuth = isChatEndpoint && CHAT_LINK_CHANNEL === LINK_CHANNEL.EMAIL;
    if (!token && isPublic || isEmailAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
