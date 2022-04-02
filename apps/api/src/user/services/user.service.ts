import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@libs/entities';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async getUser(userId?: number): Promise<User | null> {
    if (!userId) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user || null;
  }
}
