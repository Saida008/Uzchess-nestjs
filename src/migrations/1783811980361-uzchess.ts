import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783811980361 implements MigrationInterface {
    name = 'Uzchess1783811980361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courseCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_6abac9e602f9ddbe55a5876d8ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP CONSTRAINT "UQ_de991ed11f2258b97640f71a45a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "difficulties" ADD CONSTRAINT "UQ_de991ed11f2258b97640f71a45a" UNIQUE ("title")`);
        await queryRunner.query(`DROP TABLE "courseCategories"`);
    }

}
