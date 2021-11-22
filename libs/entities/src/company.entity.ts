import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from './file.entity';
import { Institution } from '@libs/entities/institution.entity';

@Entity()
@Unique(['slug'])
export class Company extends BaseEntity<Company> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'integer', default: null })
  imageId: number;

  @OneToOne(() => File)
  @JoinColumn({ name: 'imageId' })
  image: File;

  @OneToMany(() => Institution, institution => institution.company)
  institutions: Institution[];
}
