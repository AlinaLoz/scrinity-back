import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Inject, Injectable } from '@nestjs/common';

import { TJwtManager, TJwtPayload } from '@libs/auth';
import * as CONFIG from 'config';
import { AUTHORIZATION_COOKIE, ERRORS, ROLE } from '@libs/constants';
import { ManagerRepository } from '../repositories';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';

@Injectable()
export class ManagerStrategy extends PassportStrategy(Strategy) {
  @Inject() private readonly managerRepository: ManagerRepository;

  constructor() {
    super({
      secretOrKey: CONFIG.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request['cookies'][AUTHORIZATION_COOKIE];
      }]),
    });
  }

  async validate(payload: TJwtPayload): Promise<TJwtManager> {
    const manager = await this.managerRepository.find({
      where: { id: payload.subId },
      relations: ['institution'],
    });
    if (!manager[0]) {
      throw new NotFoundError([{
        field: '', message: ERRORS.MANAGER_NOT_FOUND,
      }]);
    }
    if (!manager[0].institution.isActive) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.EXPIRED_SUBSCRIPTION,
      }]);
    }
    return { managerId: payload.subId, userId: manager[0].userId, institutionId: manager[0].institutionId, role: ROLE.MANAGER };
  }
}
