import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { IGuild } from 'src/models/guild/guild.interface';
import { CreateUserDto } from 'src/models/user/createUser.dto';
import { IUser } from 'src/models/user/user.interface';
import { UserModel } from 'src/models/user/user.model';
import { Features } from 'src/models/utils/features.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async getGuilds(user: IUser) {
    const guildsJson: Array<any> = (
      await axios.get('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
    ).data;

    return guildsJson.map<IGuild>((v: any) => {
      if (v.owner) {
        return {
          id: null,
          guildId: v.id,
          ownerId: user.userId,
          icon: v.icon,
          name: v.name,
          features: Features.None,
        };
      }
    });
  }

  async isInGuild(/*guildId: string, ids: string[]*/) {}

  async getUser(userId: string): Promise<IUser> {
    return (await this.userModel.findOne({ where: { userId: userId } })).get({
      plain: true,
    });
  }

  async createUser(user: CreateUserDto): Promise<IUser> {
    return (await this.userModel.create(user)).get({ plain: true });
  }

  async getAccessToken() {}
}
