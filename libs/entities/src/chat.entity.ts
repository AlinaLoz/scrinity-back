import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CHAT_AUTH_TYPE } from '@apps/manager/сhats/dtos/chats.controller.dtos';

import { ChatCriterion } from './chat-criterion.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Institution } from './institution.entity';
import { Message } from './message.entity';

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

  @OneToMany(() => Message, (item) => item.chat)
  messages: Message[];

  @OneToMany(() => ChatCriterion, (item) => item.chat)
  criterions: ChatCriterion[];

  @Column({ type: 'varchar', default: '' })
  link: string;

  @Column({ type: 'varchar', default: CHAT_AUTH_TYPE.anonymously })
  authType: CHAT_AUTH_TYPE;
}
