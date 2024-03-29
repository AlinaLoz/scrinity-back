import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { InstitutionPublicPlatformEntity } from '@libs/entities/institution-public-platform.entity';
import { LINK_CHANNEL } from '@libs/dtos';
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

  @ManyToOne(() => Company, (company) => company.institutions)
  company: Company;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'timestamptz' })
  expiredTime: string;

  @Column({ type: 'varchar' })
  criterionGroupId: string;

  @ManyToOne(() => CriterionGroup, (group) => group.institutions)
  @JoinColumn({ name: 'criterionGroupId' })
  criterionGroup: CriterionGroup;

  @OneToOne(() => Manager, (manager) => manager.institution)
  @JoinColumn({ name: 'id', referencedColumnName: 'institutionId' })
  manager: Manager;

  @OneToMany(() => InstitutionPublicPlatformEntity, (item) => item.institution)
  publicPlatforms: InstitutionPublicPlatformEntity[];

  @Column({ type: 'enum', enum: LINK_CHANNEL, default: LINK_CHANNEL.EMAIL })
  linkChannel: LINK_CHANNEL;
}
