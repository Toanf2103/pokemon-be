import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734538777187 implements MigrationInterface {
    name = 'Migration1734538777187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`pokemons\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`pokemons\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP COLUMN \`createdAt\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`pokemons\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
