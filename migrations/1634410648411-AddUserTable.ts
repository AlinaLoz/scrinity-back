import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1634410648411 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id"          SERIAL PRIMARY KEY,
        "phoneNumber" varchar(30) UNIQUE NOT NULL,
        "createdAt"    timestamptz DEFAULT now(),
        "updatedAt"    timestamptz DEFAULT now()
      );
    `);
    await queryRunner.query(`
      ALTER TABLE phone_confirm_code ADD COLUMN "userId" integer NOT NULL;
      ALTER TABLE phone_confirm_code
        ADD CONSTRAINT "fk_userId"
        FOREIGN KEY ("userId")
        REFERENCES "user"("id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE phone_confirm_code DROP COLUMN "userId";
      DROP TABLE IF EXISTS "user";
    `);
  }

}
