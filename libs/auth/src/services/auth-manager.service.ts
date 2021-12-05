import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS, ROLE } from '@libs/constants';
import { Manager } from '@libs/entities';
import { ManagerRepository } from '../repositories/manger.repository';

@Injectable()
export class AuthManagerService {
  @Inject() private readonly managerRepository: ManagerRepository;
  @Inject() private readonly jwtService: JwtService;

  async signIn({ login, password }: { login: string, password: string }): Promise<string> {
    const manager = await this.findManagerOrFail(login);

    if (!manager.institution.isActive) {
      throw new UnprocessableEntityError([{
        field: '', message: ERRORS.EXPIRED_SUBSCRIPTION,
      }]);
    }
    const isValid = await bcrypt.compare(password, manager.password);

    if (!isValid) {
      throw new UnprocessableEntityError([{ field: '', message: ERRORS.INVALID_PASSWORD }]);
    }
    return this.jwtService.sign({ subId: manager.id, role: ROLE.MANAGER  });
  }

  private async findManagerOrFail(login: string): Promise<Manager> {
    const [manager] = await this.managerRepository.find({
      where: { login },
      relations: ['institution', 'institution.company'],
    });
    if (!manager) {
      throw new NotFoundError([{
        field: '', message: ERRORS.NOT_FOUND,
      }]);
    }
    return manager;
  }
}
