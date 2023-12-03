import axios from 'axios';
import { Service } from '../../decorators/service.decorator';
import { ConfigService } from '../config.service';
import { Profile } from './profile/profile.dto';
import { ChangeProfileDto } from './profile/changeProfile.dto';

@Service
export class BackendService {
  constructor(private readonly config: ConfigService) {}

  public async getUserProfile(discordUserId: string) {
    return await this.buildRequest<Profile>(`profile/${discordUserId}`, 'GET');
  }

  public async patchUserProfile(
    discordUserId: string,
    profile: ChangeProfileDto,
  ) {
    return await this.buildRequest<ChangeProfileDto>(
      `profile/${discordUserId}`,
      'PATCH',
      profile,
    );
  }

  private async buildRequest<T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    data?: any,
  ) {
    return (
      await axios.request<T>({
        url: `${this.config.get<string>('APP_BASE_ENDPOINT')}/${path}`,
        method: method,
        data: data,
        headers: { 'X-API-KEY': this.config.get<string>('CLIENT_TOKEN') },
      })
    ).data;
  }
}
