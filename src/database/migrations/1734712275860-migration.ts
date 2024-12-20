import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734712275860 implements MigrationInterface {
    name = 'Migration1734712275860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`lengendary\` \`legendary\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`legendary\` \`lengendary\` tinyint NOT NULL DEFAULT '0'`);
    }

}
