import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from 'src/models/guild/createGuild.dto';
import { GuildModel } from 'src/models/guild/guild.model';
import { IGuild } from 'src/models/guild/guild.interface';
import { DiscordService } from 'src/discord/discord.service';
import { IUser } from 'src/models/user/user.interface';
import { Features } from 'src/models/utils/features.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(GuildModel)
    private readonly guildModel: Repository<GuildModel>,
    private readonly discord: DiscordService,
  ) {}

  async addGuild(dto: CreateGuildDto) {
    const entity = this.guildModel.create(dto);
    return await this.guildModel.save(entity);
  }

  async botLeavedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    guild.botInvited = false;

    return await this.guildModel.update(guild.id, guild);
  }

  async botJoinedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    guild.botInvited = true;

    return await this.guildModel.update(guild.id, guild);
  }

  async patchGuild(guildId: string, dto: Omit<IGuild, 'guildId'>) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    return await this.guildModel.update(guild.id, dto);
  }

  async getGuilds(ownerId: string): Promise<IGuild[]> {
    const guilds = await this.guildModel.find({
      where: { ownerId: ownerId },
    });

    return guilds;
  }

  async getGuildOrCreate(user: IUser, guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
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
