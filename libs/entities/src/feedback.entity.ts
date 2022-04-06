import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Institution } from './institution.entity';
import { PublicPlatformEntity } from './public-platform.entity';
import { BaseEntity } from './base.entity';

@Unique(['date', 'name'])
@Entity({ name: 'feedback' })
export class FeedbackEntity extends BaseEntity<FeedbackEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  institutionId: number;

  @ManyToOne(() => Institution)
  institution: Institution;

  @Column({ type: 'integer', nullable: false })
  platformId: number;

  @ManyToOne(() => PublicPlatformEntity)
  platform: PublicPlatformEntity;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  profession: string;

  @Column({ type: 'timestamptz', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'smallint', default: 0 })
  stars: number;
}
