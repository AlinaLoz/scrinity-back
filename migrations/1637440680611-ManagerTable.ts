import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManagerTable1637440680611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE manager (
                id serial PRIMARY KEY,
                name varchar NOT NULL,
                surname varchar NOT NULL,
                "roleTitle" varchar NOT NULL,
                email varchar NOT NULL,
                login varchar NOT NULL,
                password varchar NOT NULL,
                "institutionId" integer NOT NULL,
                "imageId" integer NOT NULL,
                "createdAt"   timestamptz DEFAULT now(),
                "updatedAt"   timestamptz DEFAULT now(),
                CONSTRAINT "fkImageId"
                    FOREIGN KEY ("imageId")
                        REFERENCES file(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS manager;');
  }
}
