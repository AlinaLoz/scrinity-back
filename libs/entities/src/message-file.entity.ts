import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { File } from './file.entity';
import { Message } from './message.entity';

@Entity()
export class MessageFile {
  @PrimaryColumn({ type: 'integer' })
  messageId: number;

  @ManyToOne(() => Message)
  message: Message;

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
