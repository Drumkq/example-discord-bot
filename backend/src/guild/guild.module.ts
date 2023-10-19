import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuildModel } from 'src/models/guild/guild.model';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [SequelizeModule.forFeature([GuildModel]), DiscordModule],
  providers: [GuildService],
  controllers: [GuildController],
  exports: [GuildService],
})
export class GuildModule {}
