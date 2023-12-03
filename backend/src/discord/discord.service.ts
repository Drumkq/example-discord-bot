import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IUser } from 'src/models/user/user.interface';
import { IDiscordUser } from './interfaces/discordUser.interface';

@Injectable()
export class DiscordService {
  constructor(private readonly config: ConfigService) {
    const apiVersion = config.get<string>('DISCORD_API_VERSION');
    const baseUrl = config.get<string>('DISCORD_BASE_URL');
    this.DISCORD_ROUTE = `${baseUrl}/v${apiVersion}`;
  }

  private DISCORD_ROUTE: string;

  async getUserGuilds(user: IUser) {
    return await this.makeUserRequest<any[]>('users/@me/guilds', 'GET', user);
  }

  public async getDiscordUser(userId: string): Promise<IDiscordUser> {
    return await this.makeBotRequest<IDiscordUser>(`users/${userId}`, 'GET');
  }

  private async makeUserRequest<T>(
    route: string,
    method: 'GET' | 'POST' | 'PATCH',
    user: IUser,
  ): Promise<T> {
    try {
      return (
        await axios<T>(`${this.DISCORD_ROUTE}/${route}`, {
          method: method,
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
      ).data;
    } catch (e) {
      throw new HttpException(`${e.response.data.message}`, e.response.status);
    }
  }

  private async makeBotRequest<T>(
    route: string,
    method: 'GET' | 'POST' | 'PATCH',
  ): Promise<T> {
    try {
      return (
        await axios<T>(`${this.DISCORD_ROUTE}/${route}`, {
          method: method,
          headers: {
            Authorization: `Bot ${this.config.get<string>('CLIENT_TOKEN')}`,
          },
        })
      ).data;
    } catch (e) {
      throw new HttpException(`${e.response.data.message}`, e.response.status);
    }
  }
}
