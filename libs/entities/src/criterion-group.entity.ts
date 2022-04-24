import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Criterion } from './criterion.entity';
import { Institution } from './institution.entity';

@Entity()
export class CriterionGroup {
  @PrimaryColumn({ type: 'varchar' })
  key: string;

  @OneToMany(() => Criterion, (item) => item.criterionGroup)
  criterions: Criterion[];

  @OneToMany(() => Institution, (item) => item.criterionGroup)
  institutions: Institution[];
}
