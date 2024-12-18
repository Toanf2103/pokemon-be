import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734528841503 implements MigrationInterface {
    name = 'Migration1734528841503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pokemons\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type1\` varchar(255) NULL, \`type2\` varchar(255) NULL, \`total\` int NOT NULL, \`hp\` int NOT NULL, \`attack\` int NOT NULL, \`defence\` int NOT NULL, \`spAttack\` int NOT NULL, \`spDefence\` int NOT NULL, \`speed\` int NOT NULL, \`generation\` int NOT NULL, \`lenhendary\` tinyint NOT NULL, \`image\` text NOT NULL, \`ytbUrl\` text NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`pokemons\``);
    }

}
