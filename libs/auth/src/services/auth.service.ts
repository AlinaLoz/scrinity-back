import { Inject, Injectable } from '@nestjs/common';

import { UnprocessableError } from '@libs/exceptions/errors';
import { ERRORS } from '@libs/constants';
import { PhoneConfirmCode } from '@libs/entities';
import * as CONFIG from 'config';

import { RequestSmsCodeBodyDTO } from '../dtos/auth.controller.dtos';
import { PhoneConfirmCodeRepository } from '../repositories/phone-confirm-code.repository';

const IS_PROD = CONFIG.NODE_CONFIG_ENV === 'prod';

@Injectable()
export class AuthService {
  @Inject()
  private readonly phoneConfirmCodeRepository: PhoneConfirmCodeRepository;

  async requestSmsCode(body: RequestSmsCodeBodyDTO): Promise<boolean> {
    const activeConfirmCode = await this.phoneConfirmCodeRepository.findOne({
      where: { phoneNumber: body.phoneNumber, isActive: true },
    });
    if (activeConfirmCode) {
      throw new UnprocessableError([
        {
          field: 'phoneNumber',
          message: ERRORS.CONFIRM_CODE_REQUESTED,
        },
      ]);
    }
    const code = IS_PROD ? '111111' : '000000';
    const confirmCode = new PhoneConfirmCode({
      code,
      isActive: true,
      phoneNumber: body.phoneNumber,
    });
    await this.phoneConfirmCodeRepository.save(confirmCode);
    return true;
  }
}
