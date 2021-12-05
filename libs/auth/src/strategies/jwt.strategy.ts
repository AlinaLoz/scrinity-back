import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

import { TJwtPayload, TJwtUser } from '@libs/auth';
import * as CONFIG from 'config';
import { AUTHORIZATION_COOKIE, ROLE } from '@libs/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      secretOrKey: CONFIG.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request['cookies'][AUTHORIZATION_COOKIE];
      }]),
    });
  }

  validate(payload: TJwtPayload): TJwtUser {
    return { userId: payload.subId, role: ROLE.USER };
  }
}
