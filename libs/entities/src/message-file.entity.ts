import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { File } from './file.entity';

@Entity()
export class MessageFile {
  @PrimaryColumn({ type: 'integer' })
  messageId: number;

  @PrimaryColumn({ type: 'integer' })
  fileId: number;

  @OneToOne(() => File)
  file: File;

  @Column({ type: 'integer' })
  index: number;

  constructor(data: Partial<MessageFile>) {
    Object.assign(this, data);
  }
}
