import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Criterion } from './criterion.entity';

@Entity()
export class CriterionGroup {
  @PrimaryColumn({ type: 'varchar' })
  key: string;

  @OneToMany(() => Criterion, (item) => item.criterionGroup)
  criterions: Criterion[];
}
