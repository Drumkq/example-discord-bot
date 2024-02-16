import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuildDto } from 'src/models/guild/createGuild.dto';
import { GuildModel } from 'src/models/guild/guild.model';
import { IGuild } from 'src/models/guild/guild.interface';
import { DiscordService } from 'src/discord/discord.service';
import { Features } from 'src/models/utils/features.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchGuildDto } from '../models/guild/patchGuild.dto';

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

    if (!guild) {
      throw new NotFoundException();
    }

    guild.botInvited = false;

    return await this.guildModel.update(guild.id, guild);
  }

  async botJoinedGuild(guildId: string) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    if (!guild) {
      throw new NotFoundException();
    }

    guild.botInvited = true;

    return await this.guildModel.update(guild.id, guild);
  }

  async patchGuild(guildId: string, dto: PatchGuildDto) {
    const guild = await this.guildModel.findOne({
      where: { guildId: guildId },
    });

    if (!guild) {
      throw new NotFoundException();
    }

    return dto;
  }

  async getGuilds(ownerId: string): Promise<CreateGuildDto[]> {
    const guilds = await this.guildModel.find({
      where: { ownerId: ownerId },
    });

    if (guilds.length == 0) {
      throw new NotFoundException();
    }

    return guilds;
  }

  async getGuild(guildId: string): Promise<IGuild> {
    const guild = await this.guildModel.findOne({
      where: { guildId },
    });

    if (!guild) {
      throw new NotFoundException();
    }

    return guild;
  }

  async createGuild(guildId: string) {
    const guildInfo = await this.guildModel.findOne({ where: { guildId } });
    if (guildInfo) {
      throw new ConflictException();
    }

    const discordGuild = await this.discord.getGuild(guildId);
    if (!discordGuild) {
      throw new NotFoundException();
    }

    return this.guildModel.save({
      guildId: guildId,
      name: discordGuild.name,
      icon: discordGuild.icon,
      ownerId: discordGuild.owner_id,
      id: 0,
      coownerIdsStr: '',
      botInvited: false,
      features: Features.None,
      coownerIds: [],
    });
  }

  async deleteGuild(guildId: string): Promise<CreateGuildDto> {
    const guild = await this.guildModel.findOne({ where: { guildId } });
    if (!guild) {
      throw new NotFoundException();
    }

    await this.guildModel.delete({ guildId });

    return guild;
  }
}
