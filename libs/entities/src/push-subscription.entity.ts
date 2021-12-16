import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class PushSubscription extends BaseEntity<PushSubscription> {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'json' })
  subscription: any;

  @Column({ type: 'integer' })
  institutionId: number;
}
