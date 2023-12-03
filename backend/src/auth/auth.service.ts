import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-discord';
import { IUser } from 'src/models/user/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateDiscordUser(
    profile: Profile,
    accessToken: string,
    refreshToken: string,
  ): Promise<IUser> {
    const user = await this.userService.getUser(profile.id);

    if (!user) {
      return await this.userService.createUser({
        userId: profile.id,
        id: null,
        accessToken,
        refreshToken,
      });
    }

    const isTokensDifferent =
      user.accessToken === accessToken && user.refreshToken === refreshToken;

    if (isTokensDifferent) {
      user.set('accessToken', accessToken);
      user.set('refreshToken', refreshToken);
      await user.save();
    }

    return user.get({ plain: true });
  }

  async validateKey(secret: string): Promise<boolean> {
    return this.configService.get<string>('CLIENT_TOKEN') === secret;
  }
}
