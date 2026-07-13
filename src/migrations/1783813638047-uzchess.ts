import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1783813638047 implements MigrationInterface {
    name = 'Uzchess1783813638047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courseCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_6abac9e602f9ddbe55a5876d8ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD "icon" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP CONSTRAINT "UQ_de991ed11f2258b97640f71a45a"`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD "title" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD CONSTRAINT "UQ_de991ed11f2258b97640f71a45a" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "difficulties" DROP CONSTRAINT "UQ_de991ed11f2258b97640f71a45a"`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD "title" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "difficulties" ADD CONSTRAINT "UQ_de991ed11f2258b97640f71a45a" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "difficulties" DROP COLUMN "icon"`);
        await queryRunner.query(`DROP TABLE "courseCategories"`);
    }

}
