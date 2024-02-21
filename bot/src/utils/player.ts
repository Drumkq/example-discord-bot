import {
  AudioPlayer,
  AudioPlayerState,
  AudioPlayerStatus,
  createAudioPlayer,
} from '@discordjs/voice';
import { AudioService } from '../services/music/audio.service';
import { BackendService } from '../services/backend/backend.service';
import { TrackDto } from '../services/backend/state/tracks/track.dto';

export class Player {
  public readonly player: AudioPlayer;
  public isRepeat: boolean;
  private nextAudioInfo?: TrackDto;

  constructor(
    private readonly audio: AudioService,
    private readonly backend: BackendService,
    private readonly guildId: string,
  ) {
    this.player = createAudioPlayer();
    this.player.on('stateChange', this.onStatusChange.bind(this));
  }

  private async onStatusChange(
    _: AudioPlayerState,
    newStatus: AudioPlayerState,
  ) {
    if (newStatus.status === AudioPlayerStatus.Idle) {
      try {
        await this.play();
      } catch {}
    }
  }

  public async play() {
    if (this.player.checkPlayable()) {
      return undefined;
    }

    let audioQueue = await this.getTracks();
    if (audioQueue.length == 0) {
      throw new Error('No tracks to play. Stopping audio player');
    }

    const audio = await this.audio.createAudio(
      this.nextAudioInfo ? this.nextAudioInfo : audioQueue.at(0),
    );
    this.nextAudioInfo = null;
    if (audio === undefined) {
      throw new Error('Failed to create an audio');
    }

    this.player.play(audio.resource);
    if (!this.isRepeat) {
      audioQueue = await this.removeTracks(1);
    }

    this.nextAudioInfo = !this.nextAudioInfo
      ? audioQueue.at(0)
      : this.nextAudioInfo;

    return {
      current: audio.info,
      next: await this.audio.info(this.nextAudioInfo),
    };
  }

  public async getQueue() {
    const queue = await this.getTracks();

    const current = await this.audio.info(queue.at(-1));
    return {
      current,
      next: this.nextAudioInfo
        ? await this.audio.info(this.nextAudioInfo)
        : current,
    };
  }

  public async clear() {
    return this.backend.stateManager.clearTracks(this.guildId);
  }

  public async pause() {
    return this.player.pause();
  }

  public async unpause() {
    return this.player.unpause();
  }

  public async stop() {
    return this.player.stop(true);
  }

  public async addTrack(track: TrackDto) {
    return await this.backend.stateManager.addTrack(this.guildId, track);
  }

  public async addTracks(tracks: TrackDto[]) {
    await this.backend.stateManager.addTracks(this.guildId, tracks);
  }

  public async getTracks() {
    return await this.backend.stateManager.getTracks(this.guildId);
  }

  public async removeTracks(amount: number) {
    return await this.backend.stateManager.removeTracks(this.guildId, amount);
  }
}
