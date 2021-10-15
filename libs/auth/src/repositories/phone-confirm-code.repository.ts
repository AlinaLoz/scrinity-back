import { EntityRepository, Repository } from 'typeorm';
import { PhoneConfirmCode } from '@libs/entities';

@EntityRepository(PhoneConfirmCode)
export class PhoneConfirmCodeRepository extends Repository<PhoneConfirmCode> {}
