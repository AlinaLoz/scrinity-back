import { EntityRepository, Repository } from 'typeorm';
import { User } from '@libs/entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
