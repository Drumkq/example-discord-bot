import { Injectable } from '@nestjs/common';
import { GuildState } from './dto/guild-state.dto';
import { Track } from './dto/track.dto';

@Injectable()
export class GuildStateService {
  public readonly states = new Map<string, GuildState>();

  public addTrack(guildId: string, track: Track): Track[] {
    const state = this.getState(guildId);

    state.trackQueue.push(track);

    return state.trackQueue;
  }

  public popTracks(guildId: string, n: number): Track[] {
    const state = this.states.get(guildId);
    if (!state || state.trackQueue.length == 0) {
      // Queue empty exception
    }

    if (n <= 0) return state.trackQueue;

    for (let i = 0; i < n; i++) {
      state.trackQueue.shift();
    }

    return state.trackQueue;
  }

  private getState(guildId: string): GuildState {
    const state = this.states.get(guildId);
    if (state === undefined) {
      const state: GuildState = new GuildState();

      this.states.set(guildId, state);

      return state;
    }

    return state;
  }
}
