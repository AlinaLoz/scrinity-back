import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Institution } from './institution.entity';
import { PublicPlatformEntity } from './public-platform.entity';
import { BaseEntity } from './base.entity';

@Unique(['text', 'author'])
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

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ type: 'varchar', nullable: true })
  profession: string;

  @Column({ type: 'timestamptz', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'smallint', default: 0 })
  rating: number;
}
