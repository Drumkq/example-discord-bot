import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DiscordGuard } from './guards/discord.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/user.decorator';
import { ApiKeyGuard } from './guards/apikey.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/user/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('discord')
  @HttpCode(200)
  @UseGuards(DiscordGuard)
  @ApiResponse({
    type: UserDto,
    status: 200,
  })
  async loginDiscord(@CurrentUser() user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, accessToken, ...safeUser } = user;
    return safeUser;
  }

  @Post('api')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiResponse({
    type: Boolean,
    status: 200,
  })
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized',
        },
        statusCode: {
          type: 'number',
          example: '401',
        },
      },
    },
    status: 401,
  })
  async loginLocalApi(@Request() req) {
    return req.user;
  }
}
