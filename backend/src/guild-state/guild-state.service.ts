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

  public addTracks(guildId: string, tracks: Track[]): Track[] {
    const state = this.getState(guildId);

    state.trackQueue.push(...tracks);

    return state.trackQueue;
  }

  public popTracks(guildId: string, n: number): Track[] {
    const state = this.states.get(guildId);
    if (!state) {
      return [];
    }

    if (n <= 0) return state.trackQueue;

    state.trackQueue.splice(0, n);

    if (state.trackQueue.length === 0) {
      this.states.delete(guildId);
      return [];
    }

    return state.trackQueue;
  }

  public clearTracks(guildId: string) {
    const state = this.states.get(guildId);
    if (!state) {
      return [];
    }

    state.trackQueue.length = 0;
    this.states.delete(guildId);
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
