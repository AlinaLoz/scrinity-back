import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInstitutionTable1635614300360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE institution (
                id SERIAL PRIMARY KEY,
                name varchar(50) NOT NULL,
                "companyId" INTEGER NOT NULL,
                "isActive" boolean DEFAULT FALSE NOT NULL,
                "expiredTime" timestamptz DEFAULT NULL,
                "criterionGroupId" varchar NOT NULL DEFAULT 'coffee',
                "createdAt" timestamptz DEFAULT now(),
                "updatedAt" timestamptz DEFAULT now()
            );
    
            ALTER TABLE institution
                ADD CONSTRAINT "fkCriterionGroupId"
                    FOREIGN KEY ("criterionGroupId")
                        REFERENCES criterion_group (key);
        `);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS institution;
        `);
    }

}
