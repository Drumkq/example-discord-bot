import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IUser } from 'src/models/user/user.interface';

@Injectable()
export class DiscordService {
  constructor(private readonly config: ConfigService) {
    const apiVersion = config.get<string>('DISCORD_API_VERSION');
    const baseUrl = config.get<string>('DISCORD_BASE_URL');
    this.DISCORD_ROUTE = `${baseUrl}/v${apiVersion}`;
  }

  private DISCORD_ROUTE: string;

  async getUserGuilds(user: IUser) {
    return await this.makeRequest<any[]>('users/@me/guilds', 'GET', user);
  }

  private async makeRequest<T = any>(
    route: string,
    method: 'GET' | 'POST' | 'PATCH',
    user: IUser,
  ): Promise<T> {
    return (
      await axios<T>(`${this.DISCORD_ROUTE}/${route}`, {
        method: method,
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
    ).data;
  }
}
