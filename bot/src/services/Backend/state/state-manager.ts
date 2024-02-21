import { Api } from '../api/api';
import { ConfigService } from '../../config.service';
import { StateDto } from './state.dto';
import { RequestMethods } from '../api/request-methods';
import { TrackDto } from './tracks/track.dto';

export class StateManager extends Api {
  public constructor(protected readonly config: ConfigService) {
    super(config);
  }

  public async getAllStates() {
    return await this.makeRequest<StateDto[]>('states', RequestMethods.GET);
  }

  public async getState(guildId: string) {
    return await this.makeRequest<StateDto>(
      `states/${guildId}`,
      RequestMethods.GET,
    );
  }

  public async getTracks(guildId: string) {
    return await this.makeRequest<TrackDto[]>(
      `states/tracks/${guildId}`,
      RequestMethods.GET,
    );
  }

  public async addTrack(guildId: string, track: TrackDto) {
    return await this.makeRequest<TrackDto[]>(
      `states/tracks/${guildId}`,
      RequestMethods.POST,
      track,
    );
  }

  public async addTracks(guildId: string, tracks: TrackDto[]) {
    return await this.makeRequest<TrackDto[]>(
      `states/tracks/${guildId}`,
      RequestMethods.POST,
      tracks,
    );
  }

  public async removeTracks(guildId: string, amount: number) {
    return await this.makeRequest<TrackDto[]>(
      `states/tracks/${guildId}?number=${amount}`,
      RequestMethods.DELETE,
    );
  }

  public async clearTracks(guildId: string) {
    return await this.makeRequest<void>(
      `states/tracks/${guildId}?number=${-1}`,
      RequestMethods.DELETE,
    );
  }
}
