import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Company extends BaseEntity<Company> {
  @PrimaryColumn({ type: 'varchar' })
  id: string;
  
  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @Column({ type: 'varchar', length: 20 })
  managerTitle: string;
  
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  
  @Column({ type: 'timestamptz' })
  expiredTime: string;
}
