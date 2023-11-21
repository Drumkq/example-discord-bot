import {
  AudioPlayer,
  AudioPlayerState,
  AudioPlayerStatus,
  createAudioPlayer,
} from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { AudioService } from './audio.service';
import { UrlQueueService } from './urlQueue.service';
import { AudioInfo } from '../../utils/audio';

@Service
export class PlayerService {
  constructor(
    private readonly audio: AudioService,
    private readonly urls: UrlQueueService,
  ) {
    this.player = createAudioPlayer();
    this.player.on('stateChange', this.onStateChange.bind(this));
  }

  public readonly player: AudioPlayer;
  private nextAudio: AudioInfo | undefined;

  public isRepeat: boolean = false;
  private _isPlaying: boolean = false;
  public get isPlaying() {
    return this._isPlaying;
  }
  private isPaused: boolean = false;

  public async play(
    guildId: string,
    force: boolean,
  ): Promise<
    { currentAudio: AudioInfo; nextAudio: AudioInfo | undefined } | undefined
  > {
    const url = !force ? this.urls.getUrl(guildId, true) : undefined;
    const audio = !force ? await this.audio.createAudio(url!) : undefined;

    if (audio && !this.isPlaying) {
      this.player.play(audio.resource);
      if (this.isRepeat) {
        this.urls.addUrl(guildId, url!);

        const nextUrl = this.urls.getUrl(guildId, true);
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
        this.urls.addUrl(guildId, playingAudio.info.urlToAudio);
      }

      const nextUrl = this.urls.getUrl(guildId, true);
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
        this.urls.addUrl(guildId, url!);
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
    }
  }
}
