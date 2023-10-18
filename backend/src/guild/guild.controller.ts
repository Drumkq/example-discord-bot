import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { GuildService } from './guild.service';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post('join')
  @UseGuards(ApiKeyGuard)
  async joinEvent(@Body() guildId: string) {
    return await this.guildService.botJoinedGuild(guildId);
  }

  @Delete('leave')
  @UseGuards(ApiKeyGuard)
  async leaveEvent(@Body() guildId: string) {
    return await this.guildService.botLeavedGuild(guildId);
  }
}
