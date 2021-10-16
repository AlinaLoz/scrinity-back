import { subSeconds } from 'date-fns';
import { EntityRepository, MoreThan, Repository } from 'typeorm';
import { PhoneConfirmCode } from '@libs/entities';

@EntityRepository(PhoneConfirmCode)
export class PhoneConfirmCodeRepository extends Repository<PhoneConfirmCode> {

  getActiveConfirmCode({ phoneNumber, seconds }: {
    phoneNumber: string,
    seconds: number,
  }): Promise<PhoneConfirmCode | undefined> {
    return this.findOne({
      where: {
        phoneNumber,
        isActive: true,
        createdAt: MoreThan(subSeconds(new Date(), seconds)),
      },
    });
  }

  findActiveCodeByPhoneAndCode({ code, phoneNumber }: {
    phoneNumber: string, code: string,
  }): Promise<PhoneConfirmCode | undefined> {
    return this.findOne({
      where: { phoneNumber, code, isActive: true },
    });
  }

  async updateActivenessCode({ code, phoneNumber }: {
    phoneNumber: string, code: string,
  }): Promise<void> {
    await this.update({ code, phoneNumber, isActive: true }, { isActive: false });
  }
}
