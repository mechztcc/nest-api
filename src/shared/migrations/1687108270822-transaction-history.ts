import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionHistory1687108270822 implements MigrationInterface {
  name = 'TransactionHistory1687108270822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction_history_entity" ("id" SERIAL NOT NULL, "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "shipperId" integer, "receiverId" integer, CONSTRAINT "REL_b1a9e648a50d9d9cc4fda4d3c0" UNIQUE ("shipperId"), CONSTRAINT "REL_afdef51aef1308260db042c20a" UNIQUE ("receiverId"), CONSTRAINT "PK_9e2a2ca8f74f0ee55a67c3ebd62" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_history_entity" ADD CONSTRAINT "FK_b1a9e648a50d9d9cc4fda4d3c05" FOREIGN KEY ("shipperId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_history_entity" ADD CONSTRAINT "FK_afdef51aef1308260db042c20a3" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_history_entity" DROP CONSTRAINT "FK_afdef51aef1308260db042c20a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_history_entity" DROP CONSTRAINT "FK_b1a9e648a50d9d9cc4fda4d3c05"`,
    );
    await queryRunner.query(`DROP TABLE "transaction_history_entity"`);
  }
}
