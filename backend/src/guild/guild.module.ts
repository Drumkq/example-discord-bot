import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { GuildModel } from 'src/models/guild/guild.model';
import { DiscordModule } from 'src/discord/discord.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GuildModel]), DiscordModule],
  providers: [GuildService],
  controllers: [GuildController],
  exports: [GuildService],
})
export class GuildModule {}
