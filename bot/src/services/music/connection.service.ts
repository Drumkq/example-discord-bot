import {
  CreateVoiceConnectionOptions,
  JoinVoiceChannelOptions,
  VoiceConnection,
  VoiceConnectionStatus,
  joinVoiceChannel,
} from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { PlayerService } from './player.service';

@Service
export class ConnectionService {
  public voiceConnection?: VoiceConnection;

  constructor(private readonly player: PlayerService) {}

  public join(
    options: CreateVoiceConnectionOptions & JoinVoiceChannelOptions,
  ): boolean {
    if (this.voiceConnection?.state.status === VoiceConnectionStatus.Ready) {
      return false;
    }

    if (!this.voiceConnection) {
      this.voiceConnection = joinVoiceChannel(options);
      this.voiceConnection.subscribe(this.player.player);
    } else {
      this.voiceConnection.rejoin({
        channelId: options.channelId,
        selfMute: false,
        selfDeaf: false,
      });
    }

    return true;
  }

  public leave(): boolean {
    if (!this.voiceConnection) {
      return false;
    }

    return this.voiceConnection.disconnect(); // After disconnect can't play tracks
  }
}
