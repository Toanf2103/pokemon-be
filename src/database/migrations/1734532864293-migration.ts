import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734532864293 implements MigrationInterface {
    name = 'Migration1734532864293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`total\` \`total\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`hp\` \`hp\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`attack\` \`attack\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`spAttack\` \`spAttack\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`spDefence\` \`spDefence\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`speed\` \`speed\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`generation\` \`generation\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`generation\` \`generation\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`speed\` \`speed\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`spDefence\` \`spDefence\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`spAttack\` \`spAttack\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`attack\` \`attack\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`hp\` \`hp\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`total\` \`total\` int NOT NULL`);
    }

}
