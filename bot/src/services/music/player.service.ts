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
    const audioUrl = this.urls.getUrl(guildId, true);
    if (!audioUrl) {
      if (this.nextAudio && force) {
        if (force) {
          this.player.play(this.nextAudio.resource);
          const audio = this.nextAudio;
          this.nextAudio = undefined;
          return { currentAudio: audio, nextAudio: undefined };
        }
      }

      return;
    }

    const audio = await this.audio.createAudio(audioUrl);
    if (!audio) {
      throw Error('Audio player supports only youtube urls');
    }

    if (force || !this._isPlaying) {
      this.player.play(audio.resource);
    }

    if (!this.nextAudio) {
      const nextUrl = this.urls.getUrl(guildId, true);
      if (nextUrl) {
        this.nextAudio = await this.audio.createAudio(nextUrl);
      } else {
        if (!force && this._isPlaying) {
          this.nextAudio = audio;
        }
      }
    }

    if (this.isRepeat || this.nextAudio) {
      this.urls.addUrl(guildId, audioUrl);
    }

    return {
      currentAudio: audio,
      nextAudio: this.nextAudio,
    };
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
