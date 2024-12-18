import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734532780231 implements MigrationInterface {
    name = 'Migration1734532780231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`defence\` \`defence\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokemons\` CHANGE \`defence\` \`defence\` int NOT NULL`);
    }

}
