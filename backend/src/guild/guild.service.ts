import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGuildDto } from 'src/models/guild/createGuild.dto';
import { GuildModel } from 'src/models/guild/guild.model';
import { IGuild } from 'src/models/guild/guild.interface';
import { DiscordService } from 'src/discord/discord.service';
import { IUser } from 'src/models/user/user.interface';
import { Features } from 'src/models/utils/features.enum';

@Injectable()
export class GuildService {
  constructor(
    @InjectModel(GuildModel) private readonly guildModel: typeof GuildModel,
    private readonly discord: DiscordService,
  ) {}

  async addGuild(dto: CreateGuildDto) {
    return await this.guildModel.create(dto);
  }

  async botLeavedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
      plain: true,
    });

    return await guild.update('botInvited', false);
  }

  async botJoinedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
      plain: true,
    });

    return await guild.update('botInvited', true);
  }

  async patchGuild(guildId: string, dto: Omit<IGuild, 'guildId'>) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
      plain: true,
    });

    return await guild.update(dto);
  }

  async getGuilds(ownerId: string): Promise<IGuild[]> {
    const guilds = await this.guildModel.findAll({
      where: { ownerId: ownerId },
    });

    return guilds;
  }

  async getGuildOrCreate(user: IUser, guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
      plain: true,
    });

    if (!guild) {
      const discordGuilds = await this.discord.getUserGuilds(user);
      const discordGuild = discordGuilds.find(
        (v) => v.id === guildId && v.owner,
      );

      return await this.addGuild({
        guildId: discordGuild.id,
        name: discordGuild.name,
        icon: discordGuild.icon,
        ownerId: user.userId,
        botInvited: false,
        features: Features.None,
        id: null,
      });
    }

    if (guild.ownerId !== user.userId) {
      throw Error('This user is not owner of the guild');
    }

    return guild;
  }
}
