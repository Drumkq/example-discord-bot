import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGuildDto } from 'src/models/guild/createGuild.dto';
import { GuildModel } from 'src/models/guild/guild.model';
import { IGuild } from 'src/models/guild/guild.interface';

@Injectable()
export class GuildService {
  constructor(
    @InjectModel(GuildModel) private readonly guildModel: typeof GuildModel,
  ) {}

  async addGuild(dto: CreateGuildDto) {
    return await this.guildModel.create(dto);
  }

  async botLeavedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    return await guild.update('botInvited', false);
  }

  async botJoinedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    return await guild.update('botInvited', true);
  }

  async patchGuild(guildId: string, dto: Omit<IGuild, 'guildId'>) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    return await guild.update(dto);
  }
}
