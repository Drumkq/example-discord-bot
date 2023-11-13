import { Client } from 'discord.js';
import { Bootstrap } from './bootstrap.interface';
import { Service } from '../decorators/service.decorator';

import dotenv from 'dotenv';
import { ConfigService } from './config.service';
import { inject } from 'inversify';
dotenv.config();

@Service
export class DiscordService implements Bootstrap {
  public readonly client: Client;

  constructor(@inject(ConfigService) private readonly config: ConfigService) {
    this.client = new Client({ intents: ['Guilds'] });
  }

  async initialize(): Promise<void> {
    await this.client.login(this.config.get<string>('CLIENT_SECRET'));
  }

  async cleanup(): Promise<void> {
    await this.client.destroy();
  }
}
