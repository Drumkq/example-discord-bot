import {
  CreateVoiceConnectionOptions,
  JoinVoiceChannelOptions,
  PlayerSubscription,
  VoiceConnection,
  VoiceConnectionStatus,
  getVoiceConnection,
  joinVoiceChannel,
} from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { Player } from '../../utils/player';
import { AudioService } from './audio.service';
import { BackendService } from '../backend/backend.service';

@Service
export class ConnectionService {
  constructor(
    private readonly audio: AudioService,
    private readonly backend: BackendService,
  ) {}

  public readonly players = new Map<string, Player>();
  private readonly playerSubscriptions = new Map<string, PlayerSubscription>();

  public join(
    options: CreateVoiceConnectionOptions & JoinVoiceChannelOptions,
  ): boolean {
    let voiceConnection = getVoiceConnection(options.guildId);
    if (voiceConnection?.state.status === VoiceConnectionStatus.Ready) {
      return false;
    }

    if (!voiceConnection) {
      voiceConnection = joinVoiceChannel(options);

      const player = this.players.get(options.guildId);
      if (player) {
        this.subscribe(voiceConnection, player, options.guildId);
      } else {
        const player = new Player(this.audio, this.backend, options.guildId);
        this.players.set(options.guildId, player);
        this.subscribe(voiceConnection, player, options.guildId);
      }
    } else {
      voiceConnection = joinVoiceChannel(options);
      const player = this.players.get(options.guildId);
      if (player) {
        player.stop();
      }
    }

    return true;
  }

  public leave(guildId: string) {
    const voiceConnection = getVoiceConnection(guildId);
    if (!voiceConnection) {
      return;
    }

    this.unsubscribe(voiceConnection, guildId);
    voiceConnection.destroy(false);
  }

  private subscribe(
    connection: VoiceConnection,
    player: Player,
    guildId: string,
  ) {
    const subscription = connection.subscribe(player.player);
    if (subscription) {
      this.playerSubscriptions.set(guildId, subscription);
    }
  }

  private unsubscribe(connection: VoiceConnection, guildId: string) {
    const subscription = this.playerSubscriptions.get(guildId);
    if (subscription) {
      subscription.unsubscribe();
      this.players.delete(guildId);
    }
  }
}
