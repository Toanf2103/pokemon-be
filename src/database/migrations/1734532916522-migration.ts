import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734532916522 implements MigrationInterface {
    name = 'Migration1734532916522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`lenhendary\` \`lenhendary\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`lenhendary\` \`lenhendary\` tinyint NOT NULL`);
    }

}
