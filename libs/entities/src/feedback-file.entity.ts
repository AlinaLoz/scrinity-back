import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FeedbackFile {
  @PrimaryColumn({ type: 'integer' })
  feedbackId: number;

  @PrimaryColumn({ type: 'varchar' })
  fileId: string;

  constructor(data: Partial<FeedbackFile>) {
    Object.assign(this, data);
  }
}
