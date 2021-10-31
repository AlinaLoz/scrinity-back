import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFeedbackTable1635614300361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE feedback
            (
                id          serial PRIMARY KEY,
                "userId"    integer DEFAULT NULL,
                "companyId" varchar NOT NULL,
                "isGood"    boolean NOT NULL,
                "message"   varchar NOT NULL,
                CONSTRAINT "fkUserId"
                    FOREIGN KEY ("userId")
                        REFERENCES public.user (id),
                CONSTRAINT "fkCompanyId"
                    FOREIGN KEY ("companyId")
                        REFERENCES public.company (id),
                "createdAt"    timestamptz DEFAULT now(),
                "updatedAt"    timestamptz DEFAULT now()
            );
    
            CREATE TABLE feedback_criterion
            (
                "feedbackId"  integer NOT null,
                "criterionKey" varchar NOT null,
                PRIMARY KEY ("feedbackId", "criterionKey"),
                CONSTRAINT "fkFeedbackId"
                    FOREIGN KEY ("feedbackId")
                        REFERENCES public.feedback (id),
                CONSTRAINT "fkCriterionKey"
                    FOREIGN KEY ("criterionKey")
                        REFERENCES public.criterion (key)
            );
    
            CREATE TABLE feedback_file
            (
                "feedbackId" integer NOT null,
                "fileId"     varchar NOT null,
                PRIMARY KEY ("feedbackId", "fileId"),
                CONSTRAINT "fkFeedbackId"
                    FOREIGN KEY ("feedbackId")
                        REFERENCES public.feedback (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "feedback_file";
            DROP TABLE IF EXISTS "feedback_criterion";
            DROP TABLE IF EXISTS "feedback";
        `);
    }

}
