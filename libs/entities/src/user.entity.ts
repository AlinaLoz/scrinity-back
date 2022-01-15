import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity<User> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null })
  phoneNumber: string;

  @Column({ type: 'varchar', default: null })
  email: string;
}
