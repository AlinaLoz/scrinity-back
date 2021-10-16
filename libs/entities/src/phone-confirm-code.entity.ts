import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class PhoneConfirmCode extends BaseEntity<PhoneConfirmCode> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
