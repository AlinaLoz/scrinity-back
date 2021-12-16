import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePushSubscriptions1639684405492 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE push_subscription (
        id varchar PRIMARY KEY,
        "subscription" json NOT NULL,
        "institutionId" integer NOT NULL,
        "createdAt" timestamptz DEFAULT now(),
        "updatedAt" timestamptz DEFAULT now(),
        CONSTRAINT fk_institutionId
          FOREIGN KEY("institutionId")
          REFERENCES institution(id)
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS push_subscription;');
  }
}
