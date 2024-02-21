import { Api } from '../api/api';
import { ChangeProfileDto } from './changeProfile.dto';
import { RequestMethods } from '../api/request-methods';
import { ConfigService } from '../../config.service';
import { ProfileDto } from './profile.dto';

export class ProfileManager extends Api {
  public constructor(protected readonly config: ConfigService) {
    super(config);
  }

  public async getProfile(userId: string): Promise<ProfileDto | undefined> {
    return await this.makeRequest<ProfileDto>(
      `profiles/${userId}`,
      RequestMethods.GET,
    );
  }

  public async getProfileInfo(
    userId: string,
  ): Promise<ChangeProfileDto | undefined> {
    return await this.makeRequest<ChangeProfileDto>(
      `profiles/${userId}`,
      RequestMethods.GET,
    );
  }

  public async createProfile(dto: ProfileDto) {
    return await this.makeRequest<ProfileDto>(
      'profiles',
      RequestMethods.POST,
      dto,
    );
  }

  public async changeProfileInfo(
    userId: string,
    dto: ChangeProfileDto,
  ): Promise<ProfileDto | undefined> {
    try {
      return await this.makeRequest<ProfileDto>(
        `profiles/${userId}`,
        RequestMethods.PUT,
        dto,
      );
    } catch (e) {
      return await this.createProfile({
        userId,
        id: 0,
        dickSize: dto.dickSize,
      });
    }
  }
}
