import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { File } from './file.entity';
import { Institution } from '@libs/entities/institution.entity';
import { User } from './user.entity';

@Entity()
export class Manager extends BaseEntity<Manager> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  roleTitle: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'integer' })
  institutionId: number;

  @OneToOne(() => Institution)
  @JoinColumn({ name: 'institutionId' })
  institution: Institution;

  @Column({ type: 'integer' })
  imageId: number;

  @OneToOne(() => File)
  @JoinColumn({ name: 'imageId' })
  image: File;
  
  @Column({ type: 'integer' })
  userId: number;
  
  @OneToOne(() => User)
  user: User;
}

