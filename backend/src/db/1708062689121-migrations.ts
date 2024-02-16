import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708062689121 implements MigrationInterface {
    name = 'Migrations1708062689121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Guild\` (\`id\` int NOT NULL AUTO_INCREMENT, \`guildId\` varchar(255) NOT NULL, \`botInvited\` tinyint NOT NULL, \`ownerId\` text NOT NULL, \`coownerIds\` text NULL, \`icon\` text NOT NULL, \`name\` text NOT NULL, \`features\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_c98723c93b41d390a98b5bd61a\` (\`guildId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GuildConfig\` (\`id\` int NOT NULL AUTO_INCREMENT, \`guildId\` varchar(255) NOT NULL, \`capsCheck\` tinyint NOT NULL, \`nsfwCheck\` tinyint NOT NULL, \`guildLinksCheck\` tinyint NOT NULL, \`rolesStr\` text NULL, \`message\` text NOT NULL, UNIQUE INDEX \`IDX_17a0bba2633ea4112bfa46917f\` (\`guildId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`accessToken\` text NULL, \`refreshToken\` text NULL, UNIQUE INDEX \`IDX_45f0625bd8172eb9c821c948a0\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`dickSize\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` ON \`Profile\``);
        await queryRunner.query(`DROP TABLE \`Profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_45f0625bd8172eb9c821c948a0\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_17a0bba2633ea4112bfa46917f\` ON \`GuildConfig\``);
        await queryRunner.query(`DROP TABLE \`GuildConfig\``);
        await queryRunner.query(`DROP INDEX \`IDX_c98723c93b41d390a98b5bd61a\` ON \`Guild\``);
        await queryRunner.query(`DROP TABLE \`Guild\``);
    }

}
