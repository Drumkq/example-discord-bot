import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/models/user/user.interface';

@Injectable()
export class DiscordStraregy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('CLIENT_ID'),
      clientSecret: config.get<string>('CLIENT_SECRET'),
      callbackURL: config.get<string>('CALLBACK_URL'),
      scope: ['identify', 'guilds'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<IUser> {
    const user = await this.authService.validateDiscordUser(
      profile,
      accessToken,
      refreshToken,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
