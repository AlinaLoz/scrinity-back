import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Institution } from './institution.entity';

@Entity()
export class Chat extends BaseEntity<Chat> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  userId: number | null;

  @OneToOne(() => User)
  user: User;

  @Column({ type: 'boolean' })
  isGood: boolean;

  @Column({ type: 'integer' })
  institutionId: number;

  @OneToOne(() => Institution)
  institution: Institution;

  @Column({ type: 'timestamptz' })
  createdAt: string;
}
