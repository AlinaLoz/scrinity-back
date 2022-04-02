import { EntityRepository, Repository } from 'typeorm';
import { Manager } from '@libs/entities';

@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {}
