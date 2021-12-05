import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Manager } from '@libs/entities';

@Injectable()
export class ManagerService {
  @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>;

  async getUser(userId?: number): Promise<Manager | null> {
    if (!userId) {
      return null;
    }
    const manager = await this.managerRepository.findOne({
      where: { id: userId },
      relations: ['image', 'user'],
    });
    return manager || null;
  }
}

