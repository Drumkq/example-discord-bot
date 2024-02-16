import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { ChangeProfileDto } from 'src/models/profile/changeProfile.dto';
import { DiscordService } from 'src/discord/discord.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from '../models/profile/createProfile.dto';

@ApiSecurity('api-key')
@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly discord: DiscordService,
  ) {}

  @Get(':userId')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({ type: 'string', description: 'Discord user id', name: 'userId' })
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
  public async get(@Param('userId') userId) {
    await this.discord.getDiscordUser(userId);
    return await this.profileService.getProfile(userId);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Create user profile' })
  @ApiCreatedResponse({
    type: CreateProfileDto,
  })
  @ApiConflictResponse({
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
  public async create(@Body() dto: CreateProfileDto) {
    await this.discord.getDiscordUser(dto.userId);
    return await this.profileService.createProfile(dto);
  }

  @Put(':userId')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Change user profile' })
  @ApiParam({ type: 'string', description: 'Discord user id', name: 'userId' })
  @ApiOkResponse({
    type: ChangeProfileDto,
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
  public async patch(
    @Param('userId') userId: string,
    @Body() dto: ChangeProfileDto,
  ) {
    await this.discord.getDiscordUser(userId);
    return await this.profileService.patchProfile(userId, dto);
  }

  @Delete(':userId')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Delete user profile' })
  @ApiParam({ type: 'string', description: 'Discord user id', name: 'userId' })
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
  public async delete(@Param('userId') userId: string) {
    await this.discord.getDiscordUser(userId);
    return await this.profileService.deleteProfile(userId);
  }
}
