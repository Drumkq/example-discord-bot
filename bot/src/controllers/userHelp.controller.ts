import { CommandInteraction } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { SlashCommandService } from '../services/slashCommand.service';

@Controller
export class UserHelpController {
  constructor(private readonly slashCommand: SlashCommandService) {}

  @SlashCommand({ description: 'Help' })
  async help(interaction: CommandInteraction) {
    console.log(this.slashCommand.getAllCommandsInfo());
    await interaction.reply('Hello!');
  }
}
