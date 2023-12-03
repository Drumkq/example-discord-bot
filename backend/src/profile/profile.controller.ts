import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { ChangeProfileDto } from 'src/models/profile/changeProfile.dto';
import { DiscordService } from 'src/discord/discord.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly discord: DiscordService,
  ) {}

  @Get(':userId')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  public async get(@Param('userId') userId) {
    await this.discord.getDiscordUser(userId);
    return await this.profileService.getProfile(userId);
  }

  @Patch(':userId')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  public async patch(
    @Param('userId') userId: string,
    @Body() dto: ChangeProfileDto,
  ) {
    await this.discord.getDiscordUser(userId);
    return await this.profileService.patchProfile(userId, dto);
  }
}
