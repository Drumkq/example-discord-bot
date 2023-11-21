import { CommandInteraction, EmbedBuilder, REST, Routes } from 'discord.js';
import { Service } from '../../decorators/service.decorator';
import { Bootstrap } from '../bootstrap.interface';
import { ConfigService } from '../config.service';
import { ISlashCommand } from '../../decorators/slashCommands/slashCommand.interface';
import { SlashCommand } from '../../decorators/slashCommands/SlashCommand';

export const commandsContext = new Array<SlashCommand>();

@Service
export class SlashCommandService implements Bootstrap {
  private readonly rest: REST;

  constructor(private readonly config: ConfigService) {
    this.rest = new REST({ version: '10' }).setToken(
      config.get<string>('CLIENT_SECRET'),
    );
  }

  async initialize(): Promise<void> {
    const commands = commandsContext.map((v) => v.getData());

    if (commands.length === 0) {
      console.error('Failed to initialize slash commands: body is undefined');
      return;
    }

    try {
      await this.rest.put(
        Routes.applicationCommands(this.config.get<string>('CLIENT_ID')),
        { body: commands },
      );

      console.log(`${commands.length} commands added`);
    } catch (e) {
      console.error(e);
    }
  }

  cleanup(): void {}

  public addCommand(command: SlashCommand) {
    commandsContext.push(command);
  }

  public async responseOnInteraction(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    commandsContext.forEach(async (command) => {
      if (interaction.commandName === command.name) {
        try {
          await command.call(interaction);
        } catch (e: any) {
          if (interaction.deferred) {
            await interaction.editReply({
              embeds: [
                new EmbedBuilder()
                  .setColor('Red')
                  .setTitle('Exception')
                  .setDescription(e.message),
              ],
            });
          }

          console.error(e);
        }
      }
    });
  }

  public getAllCommandsInfo(): Array<ISlashCommand> {
    return commandsContext;
  }

  public getCommandInfo(name: string): ISlashCommand | undefined {
    return commandsContext.find((v) => v.name === name);
  }
}
