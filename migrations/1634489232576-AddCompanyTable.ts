import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyTable1634489232576 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE company (
        id varchar PRIMARY KEY,
        name varchar(50) NOT NULL,
        "managerTitle" varchar(20) NOT NULL,
        "isActive" boolean DEFAULT FALSE NOT NULL,
        "expiredTime" timestamptz DEFAULT NULL,
        "createdAt" timestamptz DEFAULT now(),
        "updatedAt" timestamptz DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS company;
    `);
  }

}
