import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ChatCriterion {
  @PrimaryColumn({ type: 'integer' })
  chatId: number;

  @PrimaryColumn({ type: 'varchar' })
  criterionKey: string;

  constructor(data: Partial<ChatCriterion>) {
    Object.assign(this, data);
  }
}
