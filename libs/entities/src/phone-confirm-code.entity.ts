import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class PhoneConfirmCode extends BaseEntity<PhoneConfirmCode> {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'varchar' })
  phoneNumber: string = '';

  @Column({ type: 'varchar' })
  code: string = '';

  @Column({ type: 'boolean' })
  isActive: boolean = false;
}
