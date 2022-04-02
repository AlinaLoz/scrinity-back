import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AGGREGATION_TYPE, PLATFORM_AGGREGATORS } from '@libs/constants';

@Entity({ name: 'public_platform' })
export class PublicPlatformEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PLATFORM_AGGREGATORS })
  name: PLATFORM_AGGREGATORS;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'enum', enum: AGGREGATION_TYPE, default: AGGREGATION_TYPE.PARSER })
  aggregationType: AGGREGATION_TYPE;
}
