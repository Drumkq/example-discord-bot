import { ActivityType } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { Once } from '../decorators/events/once.decorator';
import { DiscordService } from '../services/discord.service';
import { inject } from 'inversify';

@Controller
export class ServerController {
  constructor(
    @inject(DiscordService) private readonly discord: DiscordService,
  ) {}

  @Once('ready')
  public ready() {
    console.log('Bot currently online!');

    this.discord.client.user?.setActivity({
      type: ActivityType.Listening,
      name: 'и повинуется вам',
      state: 'пропишите "/help" и я расскажу обо всём!',
    });
  }
}
