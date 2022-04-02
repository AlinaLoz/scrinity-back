import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPublicPlatform1648901092451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "public_platform" ("name")
        VALUES ('YANDEX'), ('GOOGLE'), ('RELAX'), ('TRIPADVISOR'), ('CARTE'), ('KOKO');

        INSERT INTO institution_public_platform ("institutionId", "publicPlatformId", "url")
        VALUES (1, 1, 'https://yandex.by/maps/org/madness/194133240462/?ll=27.563439%2C53.924718&z=17.11');
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
