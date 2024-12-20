import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734711955839 implements MigrationInterface {
    name = 'Migration1734711955839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`lenhendary\` \`lengendary\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`lengendary\` \`lenhendary\` tinyint NOT NULL DEFAULT '0'`);
    }

}
