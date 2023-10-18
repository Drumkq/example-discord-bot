import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DiscordGuard } from './guards/discord.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/user.decorator';
import { ApiKeyGuard } from './guards/apikey.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('discord')
  @UseGuards(DiscordGuard)
  async loginDiscord(@CurrentUser() user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, accessToken, ...safeUser } = user;
    return safeUser;
  }

  @Post('api')
  @UseGuards(ApiKeyGuard)
  async loginLocalApi(@Request() req) {
    return req.user;
  }
}
