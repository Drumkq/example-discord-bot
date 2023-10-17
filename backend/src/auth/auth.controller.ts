import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscordGuard } from './guards/discord.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('discord')
  @UseGuards(DiscordGuard)
  async loginDiscord(@CurrentUser() user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
