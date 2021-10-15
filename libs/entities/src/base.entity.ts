import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity<T> {
  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()' })
  updateAt: string;

  constructor(data: Partial<T>) {
    Object.assign(this, data);
  }
}
