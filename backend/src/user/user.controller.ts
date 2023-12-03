import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProfileService } from 'src/profile/profile.service';
import { IUser } from 'src/models/user/user.interface';
import { IGuild } from 'src/models/guild/guild.interface';
import { IProfile } from 'src/models/profile/profile.interface';
import { GuildService } from 'src/guild/guild.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly guildService: GuildService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('guilds')
  @UseGuards(AuthGuard)
  async getGuilds(@CurrentUser() user) {
    return await this.userService.getGuilds(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserProfile(
    @CurrentUser() user: IUser,
  ): Promise<{ profile: IProfile; guilds: Array<IGuild> }> {
    return {
      profile: await this.profileService.getProfile(user.userId),
      guilds: await this.guildService.getGuilds(user.userId),
    };
  }
}
