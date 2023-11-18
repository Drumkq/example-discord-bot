import {
  CommandInteraction,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
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
    if (commandsContext.length === 0) {
      console.error('Failed to initialize slash commands: body is undefined');
      return;
    }

    try {
      const commands = this.buildCommands(commandsContext);

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

  private buildCommands(
    commands: SlashCommandMetadata[],
  ): Array<RESTPostAPIChatInputApplicationCommandsJSONBody> {
    const cmds = Array<RESTPostAPIChatInputApplicationCommandsJSONBody>();

    commands.forEach((cmd) => {
      cmd.builder.setName(cmd.name ?? cmd.key).setDescription(cmd.description);
      cmd.options?.forEach((option) => {
        option.build(cmd.builder);
      });

      cmds.push(cmd.builder.toJSON());
    });

    return cmds;
  }

  public addCommand(command: SlashCommandMetadata, target: any) {
    commandsContext.push({
      key: command.key,
      name: command.name,
      target: target,
      description: command.description,
      builder: command.builder,
      options: command.options,
    });
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
