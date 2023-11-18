import {
  CreateVoiceConnectionOptions,
  JoinVoiceChannelOptions,
  VoiceConnection,
  VoiceConnectionStatus,
  joinVoiceChannel,
} from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { AudioService } from './audio.service';

@Service
export class ConnectionService {
  public voiceConnection?: VoiceConnection;

  constructor(private readonly player: AudioService) {}

  private connected: boolean = false;

  public join(
    options: CreateVoiceConnectionOptions & JoinVoiceChannelOptions,
  ): boolean {
    if (this.voiceConnection?.state.status === VoiceConnectionStatus.Ready) {
      return false;
    }

    if (!this.voiceConnection) {
      this.voiceConnection = joinVoiceChannel(options);
      this.voiceConnection.subscribe(this.player.player);

      this.voiceConnection.on('stateChange', (oldState, newState) => {
        if (newState.status === VoiceConnectionStatus.Disconnected) {
          this.player.clearQueue();
          this.player.player.stop(true);
          this.player.connected = false;
        }

        if (
          newState.status === VoiceConnectionStatus.Ready ||
          newState.status === VoiceConnectionStatus.Signalling
        ) {
          this.player.connected = true;
        }
      });
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

  public isConnected(): boolean {
    return this.connected;
  }
}
