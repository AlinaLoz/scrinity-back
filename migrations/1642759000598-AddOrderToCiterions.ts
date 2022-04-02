import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToCiterions1642759000598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE criterion ADD COLUMN "order" integer DEFAULT 0;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE criterion DROP COLUMN "order";');
  }
}
