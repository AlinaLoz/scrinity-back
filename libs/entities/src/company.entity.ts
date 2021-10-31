import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CriterionGroup } from '@libs/entities/criterion-group.entity';

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

  @Column({ type: 'varchar' })
  criterionGroupId: string;

  @OneToOne(() => CriterionGroup)
  @JoinColumn({ name: 'criterionGroupId' })
  criterionGroup: CriterionGroup;
}
