import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProfileService } from 'src/profile/profile.service';
import { IUser } from 'src/models/user/user.interface';
import { GuildService } from 'src/guild/guild.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from '../models/profile/createProfile.dto';
import { CreateGuildDto } from '../models/guild/createGuild.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@ApiSecurity('discord-oauth2')
@ApiTags('Users')
@Controller('@me')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly guildService: GuildService,
    private readonly profileService: ProfileService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Get('guilds')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `Get current user's guilds` })
  @ApiOkResponse({
    type: CreateGuildDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
        },
        statusCode: {
          type: 'string',
        },
      },
    },
  })
  async getGuilds(@CurrentUser() user) {
    return await this.guildService.getGuilds(user.userId);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `Get current user's profile` })
  @ApiOkResponse({
    type: CreateProfileDto,
  })
  @ApiNotFoundResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
        },
        statusCode: {
          type: 'string',
        },
      },
    },
  })
  async getUserProfile(@CurrentUser() user: IUser): Promise<CreateProfileDto> {
    return await this.profileService.getProfile(user.userId);
  }

  @Get('test')
  async test() {
    await this.cache.set(makeid(20), makeid(5));
    return this.cache.store.keys();
  }
}

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
