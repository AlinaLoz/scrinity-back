import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MessageFile } from './message-file.entity';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity<Message> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @JoinColumn()
  chatId: number;

  @ManyToOne(() => Chat)
  chat: Chat;

  @Column({ type: 'integer', nullable: true })
  senderId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'senderId', referencedColumnName: 'id' })
  sender: User;

  @Column({ type: 'varchar' })
  content: string;

  @OneToMany(() => MessageFile, (item) => item.message)
  files: MessageFile[];

  @Column({ type: 'boolean' })
  read: boolean;
}
