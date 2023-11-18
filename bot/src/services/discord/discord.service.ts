import { Client } from 'discord.js';
import { Bootstrap } from '../bootstrap.interface';
import { Service } from '../../decorators/service.decorator';
import { ConfigService } from '../config.service';

@Service
export class DiscordService implements Bootstrap {
  public readonly client: Client;

  constructor(private readonly config: ConfigService) {
    this.client = new Client({ intents: ['Guilds'] });
  }

  async initialize(): Promise<void> {
    await this.client.login(this.config.get<string>('CLIENT_SECRET'));
  }

  async cleanup(): Promise<void> {
    await this.client.destroy();
  }
}
