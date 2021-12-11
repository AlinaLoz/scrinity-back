import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLinkToChat1638905623699 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE chats ADD COLUMN link varchar DEFAULT \'\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE chats DROP COLUMN link');
  }
}