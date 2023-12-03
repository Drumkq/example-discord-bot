import { Client } from 'discord.js';
import { Bootstrap } from '../bootstrap.interface';
import { Service } from '../../decorators/service.decorator';
import { ConfigService } from '../config.service';
import * as dl from 'play-dl';

@Service
export class DiscordService implements Bootstrap {
  public readonly client = new Client({
    intents: ['Guilds', 'GuildVoiceStates'],
  });

  constructor(private readonly config: ConfigService) {}

  async initialize(): Promise<void> {
    await this.client.login(this.config.get<string>('CLIENT_SECRET'));
    await dl.setToken({
      youtube: { cookie: this.config.get<string>('YT_COOCKIE') },
    });
  }

  async cleanup(): Promise<void> {
    await this.client.destroy();
  }
}
