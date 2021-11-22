import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@libs/entities/base.entity';

@Entity()
export class Message extends BaseEntity<Message> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  chatId: number;

  @Column({ type: 'integer' })
  senderId: number;

  @Column({ type: 'varchar' })
  content: string;
}
