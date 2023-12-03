import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscordService } from 'src/discord/discord.service';
import { CreateUserDto } from 'src/models/user/user.dto';
import { IUser } from 'src/models/user/user.interface';
import { UserModel } from 'src/models/user/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly discord: DiscordService,
  ) {}

  async getGuilds(user: IUser) {
    return (await this.discord.getUserGuilds(user)).map((v) => v.owner);
  }

  async isInGuild(/*guildId: string, ids: string[]*/) {}

  async getUser(userId: string): Promise<UserModel> {
    return await this.userModel.findOne({ where: { userId: userId } });
  }

  async createUser(user: CreateUserDto): Promise<UserModel> {
    return await this.userModel.create(user);
  }

  async getAccessToken() {}
}
