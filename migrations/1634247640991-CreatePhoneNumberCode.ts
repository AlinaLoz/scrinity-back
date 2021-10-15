import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePhoneNumberCode1634247640991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE phone_confirm_code (
        "id"          serial PRIMARY KEY,
        "phoneNumber" varchar(20) NOT NULL,
        "code"        varchar(6)  NOT NULL,
        "isActive"    boolean     DEFAULT TRUE,
        "createdAt"   timestamptz DEFAULT now(),
        "updateAt"    timestamptz DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS phone_confirm_code;
    `);
  }
}
