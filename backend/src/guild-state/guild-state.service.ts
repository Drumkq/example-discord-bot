import { Injectable } from '@nestjs/common';
import { GuildState } from './types/guild-state.type';
import { Track } from 'src/music/types/track.type';

@Injectable()
export class GuildStateService {
  private readonly state = new Map<string, GuildState>();

  public addTrack(guildId: string, track: Track) {
    const state = this.getState(guildId);

    state.audioQueue.push(track);
  }

  public popTracks(guildId: string, n: number): Track[] {
    const state = this.getState(guildId);
    if (n <= 0) return [];

    const erasedTracks = new Array<Track>();

    for (let i = 0; i < n; i++) {
      erasedTracks.push(state.audioQueue.shift());
    }

    return erasedTracks;
  }

  private getState(guildId: string): GuildState {
    const state = this.state.get(guildId);
    if (!state) {
      const state: GuildState = {
        audioQueue: [],
      };

      this.state.set(guildId, state);

      return state;
    }

    return state;
  }
}
