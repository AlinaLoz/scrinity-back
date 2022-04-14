import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CriterionGroup } from './criterion-group.entity';

@Entity()
export class Criterion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  criterionGroupId: string;

  @ManyToOne(() => CriterionGroup, (item) => item.criterions)
  @JoinColumn({ name: 'criterionGroupId' })
  criterionGroup: CriterionGroup;

  @Column({ type: 'boolean', default: false })
  isGood: boolean;

  @Column({ type: 'integer', default: 0 })
  order: number;
}
