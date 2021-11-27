import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Institution } from './institution.entity';
import { Message } from './message.entity';
import { ChatCriterion } from '@libs/entities/chat-criterion.entity';

@Entity()
export class Chat extends BaseEntity<Chat> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  userId: number | null;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'boolean' })
  isGood: boolean;

  @Column({ type: 'integer' })
  institutionId: number;

  @OneToOne(() => Institution)
  institution: Institution;

  @OneToMany(() => Message, item => item.chat)
  messages: Message[];

  @OneToMany(() => ChatCriterion, item => item.chat)
  criterions: ChatCriterion[];
}
