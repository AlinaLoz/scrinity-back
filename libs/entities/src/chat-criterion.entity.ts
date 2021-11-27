import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Chat } from '@libs/entities/chat.entity';

@Entity()
export class ChatCriterion {
  @PrimaryColumn({ type: 'integer' })
  chatId: number;

  @ManyToOne(() => Chat)
  chat: Chat;

  @PrimaryColumn({ type: 'varchar' })
  criterionKey: string;

  constructor(data: Partial<ChatCriterion>) {
    Object.assign(this, data);
  }
}
