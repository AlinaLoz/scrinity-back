import { Inject, Injectable } from '@nestjs/common';
import * as rs from 'randomstring';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions/errors';
import {
  CONFIRM_CODE_LENGTH,
  CONFIRM_CODE_REQUEST_INTERVAL_DEV_SEC,
  CONFIRM_CODE_REQUEST_INTERVAL_PROD_SEC,
  ERRORS,
  ROLE,
} from '@libs/constants';
import { PhoneConfirmCode, User } from '@libs/entities';
import * as CONFIG from 'config';

import { RequestSmsCodeBodyDTO, VerifyConfirmCodeBodyDTO } from '../dtos/auth-api.controller.dtos';
import { PhoneConfirmCodeRepository } from '../repositories/phone-confirm-code.repository';
import { UserRepository } from '../repositories/user.repository';

const isDev = CONFIG.NODE_CONFIG_ENV !== 'prod';

@Injectable()
export class AuthApiService {
  @Inject() private readonly phoneConfirmCodeRepository: PhoneConfirmCodeRepository;
  @Inject() private readonly userRepository: UserRepository;
  @Inject() private readonly jwtService: JwtService;

  generateToken(id: number, role: ROLE): string {
    return this.jwtService.sign({ subId: id, role });
  }

  async requestSmsCode(body: RequestSmsCodeBodyDTO): Promise<boolean> {
    const user = await this.findUserOrCreate(body.phoneNumber);
    const smsRequestInterval = isDev ? CONFIRM_CODE_REQUEST_INTERVAL_DEV_SEC : CONFIRM_CODE_REQUEST_INTERVAL_PROD_SEC;
    const activeConfirmCode = await this.phoneConfirmCodeRepository.getActiveConfirmCode({
      phoneNumber: body.phoneNumber,
      seconds: smsRequestInterval,
    });
    if (activeConfirmCode) {
      throw new UnprocessableEntityError([
        {
          field: '',
          message: ERRORS.REQUEST_CONFIRM_CODE_LIMIT,
        },
      ]);
    }
    const code = isDev
      ? '0000'
      : rs.generate({
          length: CONFIRM_CODE_LENGTH,
          charset: 'numeric',
        });
    const confirmCode = new PhoneConfirmCode({
      userId: user.id,
      code,
      isActive: true,
      phoneNumber: body.phoneNumber,
    });
    await this.phoneConfirmCodeRepository.save(confirmCode);
    // todo send to sms service
    return true;
  }

  async verifyConfirmCode(body: VerifyConfirmCodeBodyDTO): Promise<string> {
    const verificationCode = await this.phoneConfirmCodeRepository.findActiveCodeByPhoneAndCode({
      code: body.code,
      phoneNumber: body.phoneNumber,
    });
    if (!verificationCode) {
      throw new NotFoundError([
        {
          field: 'code',
          message: ERRORS.CODE_NOT_FOUND,
        },
      ]);
    }
    await this.phoneConfirmCodeRepository.updateActivenessCode(verificationCode);
    return this.jwtService.sign({ subId: verificationCode.userId, role: ROLE.USER });
  }

  private async findUserOrCreate(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (!user) {
      return this.userRepository.save(new User({ phoneNumber }));
    }
    return user;
  }
}
