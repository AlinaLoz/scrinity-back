import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FeedbackCriterion {
  @PrimaryColumn({ type: 'integer' })
  feedbackId: number;

  @PrimaryColumn({ type: 'varchar' })
  criterionKey: string;

  constructor(data: Partial<FeedbackCriterion>) {
    Object.assign(this, data);
  }
}
