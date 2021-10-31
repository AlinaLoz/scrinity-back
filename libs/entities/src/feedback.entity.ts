import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Feedback extends BaseEntity<Feedback> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  userId: number | null;

  @Column({ type: 'varchar' })
  companyId: string;

  @Column({ type: 'boolean' })
  isGood: boolean;

  @Column({ type: 'varchar' })
  message: string;
}
