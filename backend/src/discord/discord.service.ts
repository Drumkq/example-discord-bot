import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/models/user/user.interface';
import { IDiscordUser } from './interfaces/discordUser.interface';
import { HttpService } from '@nestjs/axios';
import { DiscordGuild } from './interfaces/discordGuild.interface';

@Injectable()
export class DiscordService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    const apiVersion = config.get<string>('DISCORD_API_VERSION');
    const baseUrl = config.get<string>('DISCORD_BASE_URL');
    this.DISCORD_ROUTE = `${baseUrl}/v${apiVersion}`;
  }

  private DISCORD_ROUTE: string;

  async getUserGuilds(user: IUser) {
    return await this.makeUserRequest<DiscordGuild[]>(
      'users/@me/guilds',
      'GET',
      user,
    );
  }

  public async getDiscordUser(userId: string): Promise<IDiscordUser> {
    return await this.makeBotRequest<IDiscordUser>(`users/${userId}`, 'GET');
  }

  public async getGuild(guildId: string): Promise<DiscordGuild> {
    return await this.makeBotRequest<DiscordGuild>(`guilds/${guildId}`, 'GET');
  }

  private async makeUserRequest<T>(
    route: string,
    method: 'GET' | 'POST' | 'PATCH',
    user: IUser,
  ): Promise<T> {
    return (
      await this.http.axiosRef
        .request<T>({
          method: method,
          headers: { Authorization: `Bearer ${user.accessToken}` },
          url: `${this.DISCORD_ROUTE}/${route}`,
        })
        .catch((e) => {
          throw new HttpException(
            `${e.response.data.message}`,
            e.response.status,
          );
        })
    ).data;
  }

  private async makeBotRequest<T>(
    route: string,
    method: 'GET' | 'POST' | 'PATCH',
  ): Promise<T> {
    return (
      await this.http.axiosRef
        .request<T>({
          method: method,
          headers: {
            Authorization: `Bot ${this.config.get<string>('BOT_TOKEN')}`,
          },
          url: `${this.DISCORD_ROUTE}/${route}`,
        })
        .catch((e) => {
          throw new HttpException(
            `${e.response.data.message}`,
            e.response.status,
          );
        })
    ).data;
  }
}
