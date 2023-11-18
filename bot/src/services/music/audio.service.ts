import {
  AudioPlayer,
  createAudioPlayer,
  createAudioResource,
} from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import play from 'play-dl';
import { ConfigService } from '../config.service';

@Service
export class AudioService {
  public readonly player: AudioPlayer;

  public repeat: boolean = false;
  public connected: boolean = false;

  private readonly audioUrls = new Array<string>();

  constructor(private readonly config: ConfigService) {
    this.player = createAudioPlayer();
    play.setToken({
      youtube: {
        cookie: this.config.get<string>('YT_COOCKIE'),
      },
    });
  }

  public clearQueue() {
    this.audioUrls.length = 0;
  }

  public async addSong(url: string) {
    this.audioUrls.push(url);
  }

  public async getCurrentSong() {
    if (this.repeat) {
      const url = this.audioUrls.shift();
      if (url) {
        this.audioUrls.push(url);
        return await this.createSong(url);
      }

      return undefined;
    } else {
      const url = this.audioUrls.shift();
      if (url) {
        return this.createSong(url);
      }
    }
  }

  private async createSong(url: string) {
    const stream = await play.stream(url, {
      discordPlayerCompatibility: true,
    });

    return createAudioResource(stream.stream, { inputType: stream.type });
  }
}
