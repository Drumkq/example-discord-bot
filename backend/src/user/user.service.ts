import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordService } from 'src/discord/discord.service';
import { CreateUserDto } from 'src/models/user/createUser.dto';
import { IUser } from 'src/models/user/user.interface';
import { UserModel } from 'src/models/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    private readonly discord: DiscordService,
  ) {}

  async getGuilds(user: IUser) {
    return await this.discord.getUserGuilds(user);
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
