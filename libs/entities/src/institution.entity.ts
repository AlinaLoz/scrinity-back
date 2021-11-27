import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from './company.entity';
import { CriterionGroup } from './criterion-group.entity';
import { Manager } from './manager.entity';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'integer' })
  companyId: number;

  @ManyToOne(() => Company, company => company.institutions)
  company: Company;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'timestamptz' })
  expiredTime: string;

  @Column({ type: 'varchar' })
  criterionGroupId: string;

  @OneToOne(() => CriterionGroup)
  @JoinColumn({ name: 'criterionGroupId' })
  criterionGroup: CriterionGroup;

  @OneToOne(() => Manager, manager => manager.institution)
  @JoinColumn({ name: 'id', referencedColumnName: 'institutionId' })
  manager: Manager;
}
