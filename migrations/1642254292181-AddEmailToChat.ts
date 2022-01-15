import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToChat1642254292181 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE chat_auth_type AS ENUM ('anonymously', 'byNumber', 'byEmail');
        ALTER TABLE chat ADD COLUMN "authType" chat_auth_type DEFAULT 'anonymously'::chat_auth_type;
        UPDATE chat SET "authType" = 'byNumber' WHERE "userId" IS NOT NULL;
        ALTER TABLE public.USER ALTER COLUMN "phoneNumber" SET DEFAULT NULL;
        ALTER TABLE public."user" ADD COLUMN  "email" varchar DEFAULT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.user DROP COLUMN "email";
        ALTER TABLE chat DROP COLUMN "authType";
        DROP TYPE chat_auth_type;
    `);
  }

}
