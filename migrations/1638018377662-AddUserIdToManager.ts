import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToManager1638018377662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE manager ADD COLUMN "userId" integer DEFAULT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE manager DROP COLUMN IF EXISTS "userId";
        `);
  }
}
