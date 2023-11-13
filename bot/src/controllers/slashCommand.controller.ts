import { CommandInteraction } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { On } from '../decorators/events/on.decorator';
import { SlashCommandService } from '../services/slashCommand.service';

@Controller
export class SlashCommandController {
  constructor(private readonly slashCommand: SlashCommandService) {}

  @On('interactionCreate')
  async onInteractionCreate(interaction: CommandInteraction) {
    await this.slashCommand.responseOnInteraction(interaction);
  }
}
