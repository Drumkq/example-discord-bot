import { CommandInteraction } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { SlashCommandService } from '../services/discord/slashCommand.service';
import { StringOption } from '../decorators/slashCommands/options/stringOption';

@Controller
export class UserHelpController {
  constructor(private readonly slashCommand: SlashCommandService) {}

  @SlashCommand({
    description: 'Help',
    options: [new StringOption('first', 'f', true)],
  })
  async help(interaction: CommandInteraction) {
    await interaction.reply(
      `Hello! ${interaction.options.get('first')?.value}`,
    );
  }
}
