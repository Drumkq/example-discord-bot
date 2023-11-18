import { CommandInteraction, REST, Routes } from 'discord.js';
import { Service } from '../../decorators/service.decorator';
import { Bootstrap } from '../bootstrap.interface';
import { ConfigService } from '../config.service';
import { SlashCommandMetadata } from '../../decorators/slashCommands/slashCommand.metadata.interface';
import { ISlashCommand } from '../../decorators/slashCommands/slashCommand.interface';

export const commandsContext: Array<SlashCommandMetadata> =
  new Array<SlashCommandMetadata>();

@Service
export class SlashCommandService implements Bootstrap {
  private readonly rest: REST;

  constructor(private readonly config: ConfigService) {
    this.rest = new REST({ version: '10' }).setToken(
      config.get<string>('CLIENT_SECRET'),
    );
  }

  async initialize(): Promise<void> {
    const commands = commandsContext.map((v) => v.builder.toJSON());

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

  public addCommand(command: SlashCommandMetadata) {
    commandsContext.push(command);
  }

  public async responseOnInteraction(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    commandsContext.forEach(async (command) => {
      if (interaction.commandName === command.name) {
        try {
          await command.target[command.key](interaction);
        } catch (e) {
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
