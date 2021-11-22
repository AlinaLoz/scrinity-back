import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class File extends BaseEntity<File> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  filename: string;
}
