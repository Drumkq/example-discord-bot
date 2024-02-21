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
    const token = this.config.get<string>('BOT_TOKEN');
    await this.client.login(token);
    await dl.setToken({
      youtube: { cookie: this.config.get<string>('YT_COOKIE') },
    });
  }

  async cleanup(): Promise<void> {
    await this.client.destroy();
  }
}
