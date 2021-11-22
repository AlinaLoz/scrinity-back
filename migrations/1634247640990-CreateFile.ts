import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFile1634247640990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE file (
        "id"          serial PRIMARY KEY,
        "filename" varchar NOT NULL,
        "createdAt"   timestamptz DEFAULT now(),
        "updatedAt"   timestamptz DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS file;
    `);
  }
}
