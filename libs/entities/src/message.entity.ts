import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@libs/entities/base.entity';
import { MessageFile } from '@libs/entities/message-file.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message extends BaseEntity<Message> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @JoinColumn()
  chatId: number;

  @ManyToOne(() => Chat)
  chat: Chat;

  @Column({ type: 'integer' })
  senderId: number;

  @Column({ type: 'varchar' })
  content: string;

  @OneToMany(() => MessageFile, (item) => item.message)
  files: MessageFile[];
}
