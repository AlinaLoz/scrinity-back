import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCriterion1635608888838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE criterion_group (
                key varchar PRIMARY KEY
            );
            INSERT INTO criterion_group (key) VALUES
            ('coffee'),
            ('fitness'),
            ('custom_1'),
            ('custom_2');
    
            CREATE TABLE criterion (
                key               varchar PRIMARY KEY,
                "criterionGroupId" varchar NOT NULL,
                "isGood"          boolean NOT NULL DEFAULT FALSE,
                CONSTRAINT "fkCriterionGroup"
                    FOREIGN KEY ("criterionGroupId")
                        REFERENCES criterion_group (key),
                UNIQUE ("key", "criterionGroupId")
            );
            INSERT INTO criterion (key, "criterionGroupId", "isGood") VALUES
            ('bad_personal_1', 'coffee', false),
            ('bad_personal_2', 'coffee', false),
            ('bad_personal_3', 'coffee', false),
            ('bad_personal_4', 'coffee', false),
            ('bad_personal_5', 'coffee', false),
            ('bad_personal_6', 'coffee', false),
            ('good_personal_1', 'coffee', true),
            ('good_personal_2', 'coffee', true),
            ('good_personal_3', 'coffee', true),
            ('good_personal_4', 'coffee', true),
            ('good_personal_5', 'coffee', true),
            ('good_personal_6', 'coffee', true);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "criterion";
            DROP TABLE IF EXISTS "criterion_group";
        `);
    }

}
