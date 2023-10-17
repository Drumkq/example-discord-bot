import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-discord';
import { IUser } from 'src/models/user/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
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

    return user;
  }
}
