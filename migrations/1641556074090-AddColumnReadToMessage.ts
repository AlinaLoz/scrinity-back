import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnReadToMessage1641556074090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE message ADD COLUMN "read" boolean DEFAULT TRUE;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE message DROP COLUMN "read";');
  }
}
