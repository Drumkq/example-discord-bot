import { Controller } from '../decorators/controller.decorator';
import { Once } from '../decorators/events/once.decorator';
import { BackendService } from '../services/backend/backend.service';
import { DiscordService } from '../services/discord/discord.service';
import { inject } from 'inversify';

@Controller
export class ServerController {
  constructor(
    @inject(DiscordService) private readonly discord: DiscordService,
    private readonly backend: BackendService,
  ) {}

  @Once({ name: 'ready' })
  public ready() {
    console.log('Bot currently online!');
  }
}
