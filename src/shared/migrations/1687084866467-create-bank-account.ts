import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBankAccount1687084866467 implements MigrationInterface {
  name = 'CreateBankAccount1687084866467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "document" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bank_account" ("id" SERIAL NOT NULL, "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_c2ba1381682b0291238cbc7a65" UNIQUE ("userId"), CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bank_account" ADD CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bank_account" DROP CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d"`,
    );
    await queryRunner.query(`DROP TABLE "bank_account"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
