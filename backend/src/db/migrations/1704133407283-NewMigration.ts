import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1704133407283 implements MigrationInterface {
    name = 'NewMigration1704133407283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Guild\` (\`id\` int NOT NULL, \`guildId\` text NOT NULL, \`botInvited\` tinyint NOT NULL, \`ownerId\` text NOT NULL, \`coownerIds\` text array NOT NULL, \`icon\` text NOT NULL, \`name\` text NOT NULL, \`features\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_c98723c93b41d390a98b5bd61a\` (\`guildId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Profile\` (\`id\` int NOT NULL, \`userId\` text NOT NULL, \`dickSize\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL, \`userId\` text NOT NULL, \`accessToken\` text NULL, \`refreshToken\` text NULL, UNIQUE INDEX \`IDX_45f0625bd8172eb9c821c948a0\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`guild_config_model\` (\`id\` int NOT NULL, \`guildId\` text NOT NULL, \`capsCheck\` tinyint NOT NULL, \`nsfwCheck\` tinyint NOT NULL, \`guildLinksCheck\` tinyint NOT NULL, \`roles\` text array NOT NULL, \`message\` text NOT NULL, UNIQUE INDEX \`IDX_ef7be0f4f025a7ed75aba281b5\` (\`guildId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ef7be0f4f025a7ed75aba281b5\` ON \`guild_config_model\``);
        await queryRunner.query(`DROP TABLE \`guild_config_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_45f0625bd8172eb9c821c948a0\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` ON \`Profile\``);
        await queryRunner.query(`DROP TABLE \`Profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_c98723c93b41d390a98b5bd61a\` ON \`Guild\``);
        await queryRunner.query(`DROP TABLE \`Guild\``);
    }

}
