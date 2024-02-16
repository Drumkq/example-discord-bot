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
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { GuildService } from './guild.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGuildDto } from '../models/guild/createGuild.dto';
import { PatchGuildDto } from '../models/guild/patchGuild.dto';

@ApiSecurity('api-key')
@ApiTags('Guilds')
@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get(':guildId')
  @UseGuards(ApiKeyGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get guild information' })
  @ApiParam({
    type: 'string',
    name: 'guildId',
  })
  @ApiResponse({
    type: CreateGuildDto,
    status: 200,
  })
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Not found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
    status: 404,
  })
  async getGuild(@Param('guildId') guildId) {
    return await this.guildService.getGuild(guildId);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a guild' })
  @ApiResponse({
    type: CreateGuildDto,
    status: 201,
  })
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Not found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
    status: 404,
  })
  @ApiBody({
    schema: {
      properties: {
        guildId: {
          type: 'string',
          example: '1061981229199067432',
        },
      },
    },
  })
  async createGuild(@Body() guild: { guildId: string }) {
    return await this.guildService.createGuild(guild.guildId);
  }

  @Delete(':guildId')
  @UseGuards(ApiKeyGuard)
  @HttpCode(202)
  @ApiOperation({ summary: 'Deletes a guild' })
  @ApiParam({ type: 'string', name: 'guildId' })
  @ApiResponse({
    type: CreateGuildDto,
    status: 202,
  })
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Not found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
    status: 404,
  })
  async leaveEvent(@Param('guildId') guildId) {
    return await this.guildService.deleteGuild(guildId);
  }

  @Put(':guildId')
  @UseGuards(ApiKeyGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Patches a guild' })
  @ApiParam({ type: 'string', name: 'guildId' })
  @ApiResponse({
    type: CreateGuildDto,
    status: 200,
  })
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Not found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
    status: 404,
  })
  async patchGuild(@Param('guildId') guildId, @Body() guild: PatchGuildDto) {
    return await this.guildService.patchGuild(guildId, guild);
  }
}
