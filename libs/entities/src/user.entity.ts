import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity<User> {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  phoneNumber: string;
}
