import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'passport-discord';
import { IUser } from 'src/models/user/user.interface';
import { UserModel } from 'src/models/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    private readonly configService: ConfigService,
  ) {}

  async validateDiscordUser(
    profile: Profile,
    accessToken: string,
    refreshToken: string,
  ): Promise<IUser> {
    const user = await this.userModel.findOne({
      where: { userId: profile.id },
    });

    if (!user) {
      return await this.userModel.save({
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: profile.id,
      });
    }

    const isTokensDifferent =
      user.accessToken !== accessToken || user.refreshToken !== refreshToken;

    if (isTokensDifferent) {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await this.userModel.update(user.id, user);
    }

    return user;
  }

  async validateKey(secret: string): Promise<boolean> {
    return this.configService.get<string>('CLIENT_SECRET') === secret;
  }
}
