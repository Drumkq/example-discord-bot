import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuildModel } from 'src/models/guild/guild.model';

@Module({
  imports: [SequelizeModule.forFeature([GuildModel])],
  providers: [GuildService],
  controllers: [GuildController],
})
export class GuildModule {}
