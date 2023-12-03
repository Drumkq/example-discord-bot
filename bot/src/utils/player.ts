import {
  AudioPlayer,
  AudioPlayerState,
  AudioPlayerStatus,
  createAudioPlayer,
} from '@discordjs/voice';
import { AudioService } from '../services/music/audio.service';
import { AudioInfo } from './audio';
import { UrlQueue } from './urlQueue';

export class Player {
  constructor(private readonly audio: AudioService) {
    this.player = createAudioPlayer();
    this.player.on('stateChange', this.onStateChange.bind(this));
  }

  public readonly player: AudioPlayer;
  public readonly urls = new UrlQueue();
  private nextAudio: AudioInfo | undefined;

  public isRepeat: boolean = false;
  private _isPlaying: boolean = false;
  public get isPlaying() {
    return this._isPlaying;
  }
  private isPaused: boolean = false;

  public async play(
    force: boolean,
  ): Promise<
    { currentAudio: AudioInfo; nextAudio: AudioInfo | undefined } | undefined
  > {
    const url = !force ? this.urls.getUrl(true) : undefined;
    const audio = !force ? await this.audio.createAudio(url!) : undefined;

    if (audio && !this.isPlaying) {
      this.player.play(audio.resource);
      if (this.isRepeat) {
        this.urls.addUrl(url!);

        const nextUrl = this.urls.getUrl(true);
        this.nextAudio = nextUrl
          ? await this.audio.createAudio(nextUrl)
          : undefined;
      }

      return { currentAudio: audio, nextAudio: this.nextAudio };
    }

    if (force && this.nextAudio) {
      const playingAudio = this.nextAudio;
      this.player.play(playingAudio.resource);
      if (this.isRepeat) {
        this.urls.addUrl(playingAudio.info.urlToAudio);
      }

      const nextUrl = this.urls.getUrl(true);
      this.nextAudio = nextUrl
        ? await this.audio.createAudio(nextUrl)
        : undefined;

      return {
        currentAudio: playingAudio,
        nextAudio: this.nextAudio,
      };
    }

    if (audio && this.isPlaying) {
      if (!this.nextAudio) {
        this.nextAudio = audio;
      } else {
        this.urls.addUrl(url!);
      }

      return { currentAudio: audio, nextAudio: this.nextAudio };
    }
  }

  public pause() {
    this.isPaused = this.player.pause(true);
  }

  public unpause() {
    this.isPaused = !this.player.unpause();
  }

  public stop() {
    if (this.player.stop()) {
      this._isPlaying = false;
      this.isPaused = false;
      this.urls.clear();
    }
  }

  private onStateChange(
    oldState: AudioPlayerState,
    newState: AudioPlayerState,
  ) {
    if (newState.status === AudioPlayerStatus.Playing) {
      this._isPlaying = true;
    } else {
      this._isPlaying = false;
      this.play(true);
    }
  }
}
