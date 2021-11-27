import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyTable1634489232576 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE company (
        id serial PRIMARY KEY,
        slug varchar UNIQUE,
        name varchar(50) NOT NULL,
        "imageId" integer DEFAULT NULL,
        "createdAt"   timestamptz DEFAULT now(),
        "updatedAt"   timestamptz DEFAULT now(),
        CONSTRAINT "fkImageId"
          FOREIGN KEY ("imageId")
              REFERENCES file(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS company;');
  }

}
