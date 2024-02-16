import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { GuildStateService } from './guild-state.service';
import { GuildState } from './dto/guild-state.dto';
import { Track } from './dto/track.dto';

@ApiSecurity('api-key')
@ApiTags('States')
@Controller('states')
export class GuildStateController {
  public constructor(private readonly stateService: GuildStateService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all states' })
  @ApiOkResponse({
    type: GuildState,
    description: `List with all guild's states`,
  })
  async getAll() {
    return Array.from(this.stateService.states, ([guildId, state]) => ({
      guildId,
      state,
    }));
  }

  @Get(':guildId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get single state' })
  @ApiOkResponse({
    type: GuildState,
    description: 'Guild state',
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
  @ApiParam({
    description: 'Discord guild id',
    name: 'guildId',
  })
  async get(@Param('guildId') guildId) {
    const state = this.stateService.states.get(guildId);

    if (!state) {
      throw new NotFoundException();
    }

    return state;
  }

  @Post('tracks/:guildId')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add track to the state' })
  @ApiCreatedResponse({
    type: Track,
    description: `Guild's track queue`,
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
  @ApiParam({
    description: 'Discord guild id',
    name: 'guildId',
  })
  async addTrack(@Param('guildId') guildId, @Body() track: Track) {
    return this.stateService.addTrack(guildId, track);
  }

  @Get('tracks/:guildId')
  @HttpCode(200)
  @ApiOperation({ summary: `Get guild's tracks queue` })
  @ApiOkResponse({
    type: Track,
    description: 'Tracks queue',
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
  @ApiParam({
    description: 'Discord guild id',
    name: 'guildId',
  })
  async getTracks(@Param('guildId') guildId) {
    const state = this.stateService.states.get(guildId);

    if (!state) {
      throw new NotFoundException();
    }

    return state.trackQueue;
  }

  @Delete('tracks/:guildId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove tracks from the state' })
  @ApiOkResponse({
    type: Track,
    isArray: true,
  })
  @ApiNotFoundResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Not found',
        },
        statusCode: {
          type: 'string',
          example: 404,
        },
      },
    },
  })
  @ApiParam({
    description: 'Discord guild id',
    name: 'guildId',
  })
  @ApiQuery({
    description: 'Number of tracks to remove',
    type: Number,
    name: 'number',
  })
  async removeTracks(
    @Param('guildId') guildId,
    @Query('number', ParseIntPipe) n: number,
  ) {
    return this.stateService.popTracks(guildId, n);
  }
}
