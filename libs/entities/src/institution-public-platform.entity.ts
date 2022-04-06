import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { PublicPlatformEntity } from '@libs/entities/public-platform.entity';
import { Institution } from './institution.entity';

@Entity({ name: 'institution_public_platform' })
export class InstitutionPublicPlatformEntity {
  @PrimaryColumn({ type: 'integer' })
  institutionId: number;

  @ManyToOne(() => Institution, (item) => item.publicPlatforms)
  institution: Institution;

  @PrimaryColumn({ type: 'integer' })
  publicPlatformId: number;

  @ManyToOne(() => PublicPlatformEntity)
  publicPlatform: PublicPlatformEntity;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: false })
  url: string;
}
