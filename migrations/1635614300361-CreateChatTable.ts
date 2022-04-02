import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatTable1635614300361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE chat (
                id          serial PRIMARY KEY,
                "userId"    integer DEFAULT NULL,
                "institutionId" integer NOT NULL,
                "isGood"    boolean NOT NULL,
                CONSTRAINT "fkUserId"
                    FOREIGN KEY ("userId")
                        REFERENCES public.user (id),
                CONSTRAINT "fkInstitutionId"
                    FOREIGN KEY ("institutionId")
                        REFERENCES public.institution (id),
                "createdAt"    timestamptz DEFAULT now(),
                "updatedAt"    timestamptz DEFAULT now()
            );
    
            CREATE TABLE chat_criterion (
                "chatId"  integer NOT null,
                "criterionKey" varchar NOT null,
                PRIMARY KEY ("chatId", "criterionKey"),
                CONSTRAINT "fkChatId"
                    FOREIGN KEY ("chatId")
                        REFERENCES chat (id),
                CONSTRAINT "fkCriterionKey"
                    FOREIGN KEY ("criterionKey")
                        REFERENCES public.criterion (key)
            );
    
            CREATE TABLE message (
                id serial PRIMARY KEY,
                "chatId" integer NOT NULL,
                "senderId" integer DEFAULT NULL,
                content varchar DEFAULT '',
                "createdAt" timestamptz DEFAULT now(),
                "updatedAt" timestamptz DEFAULT now(),
                CONSTRAINT "fkChatId"
                    FOREIGN KEY ("chatId")
                        REFERENCES chat (id),
                CONSTRAINT "fkSenderId"
                    FOREIGN KEY ("senderId")
                        REFERENCES public.user(id)
            );
            
            CREATE TABLE message_file
            (
                "messageId" integer NOT NULL,
                "fileId"    integer NOT NULL,
                index integer DEFAULT 0,
                PRIMARY KEY ("messageId", "fileId"),
                CONSTRAINT "fkMessageId"
                    FOREIGN KEY ("messageId")
                        REFERENCES message(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "message_file";
            DROP TABLE IF EXISTS "message";
            DROP TABLE IF EXISTS "chat_criterion";
            DROP TABLE IF EXISTS "chat";
        `);
  }
}
