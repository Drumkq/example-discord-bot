import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('guilds')
  @UseGuards(AuthGuard)
  async getGuilds(@CurrentUser() user) {
    return await this.userService.getGuilds(user);
  }
}
