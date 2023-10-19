import { Body, Controller, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { GuildService } from './guild.service';
import { IGuild } from 'src/models/guild/guild.interface';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Put('join')
  @UseGuards(ApiKeyGuard)
  async joinEvent(@Body() guildId: string) {
    return await this.guildService.botJoinedGuild(guildId);
  }

  @Put('leave')
  @UseGuards(ApiKeyGuard)
  async leaveEvent(@Body() guildId: string) {
    return await this.guildService.botLeavedGuild(guildId);
  }

  @Patch('change/:guildId')
  @UseGuards(ApiKeyGuard)
  async patchGuild(@Param('guildId') guildId, @Body() guild: IGuild) {
    return await this.guildService.patchGuild(guildId, guild);
  }
}
