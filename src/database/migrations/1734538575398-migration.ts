import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734538575398 implements MigrationInterface {
    name = 'Migration1734538575398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`favorites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`pokemon_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`FK_35a6b05ee3b624d0de01ee50593\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`FK_22533e933b7c2edaac5a63354ed\` FOREIGN KEY (\`pokemon_id\`) REFERENCES \`pokemons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`FK_22533e933b7c2edaac5a63354ed\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`FK_35a6b05ee3b624d0de01ee50593\``);
        await queryRunner.query(`DROP TABLE \`favorites\``);
    }

}
