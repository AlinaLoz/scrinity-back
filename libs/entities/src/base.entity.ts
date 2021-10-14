import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Entity()
export class BaseEntity<T> {
  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  createdAt: string = '';

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()' })
  updateAt: string = '';

  constructor(data: Partial<T>) {
    Object.assign(
      {},
      plainToClass(BaseEntity, data, { excludeExtraneousValues: true }),
    );
  }
}
