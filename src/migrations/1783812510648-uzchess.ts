import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783812510648 implements MigrationInterface {
    name = 'Uzchess1783812510648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courseCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_6abac9e602f9ddbe55a5876d8ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP CONSTRAINT "UQ_de991ed11f2258b97640f71a45a"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "code" character varying(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "code" character varying(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD CONSTRAINT "UQ_de991ed11f2258b97640f71a45a" UNIQUE ("title")`);
        await queryRunner.query(`DROP TABLE "courseCategories"`);
    }

}
