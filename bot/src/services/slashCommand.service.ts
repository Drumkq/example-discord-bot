import { CommandInteraction, REST, Routes } from 'discord.js';
import { Service } from '../decorators/service.decorator';
import { Bootstrap } from './bootstrap.interface';
import { ConfigService } from './config.service';
import { SlashCommandMetadata } from '../decorators/slashCommands/slashCommand.metadata.interface';
import { ISlashCommand } from '../decorators/slashCommands/slashCommand.interface';

interface SlashCommandExecutable extends SlashCommandMetadata {
  target: any;
}

@Service
export class SlashCommandService implements Bootstrap {
  private readonly rest: REST;
  private readonly commands: Array<SlashCommandExecutable>;

  constructor(private readonly config: ConfigService) {
    this.commands = new Array<SlashCommandExecutable>();
    this.rest = new REST({ version: '10' }).setToken(
      config.get<string>('CLIENT_SECRET'),
    );
  }

  async initialize(): Promise<void> {
    if (this.commands.length === 0) {
      console.error('Failed to initialize slash commands: body is undefined');
      return;
    }

    try {
      await this.rest.put(
        Routes.applicationCommands(this.config.get<string>('CLIENT_ID')),
        { body: this.commands as ISlashCommand },
      );

      console.log(`${this.commands.length} commands added`);
    } catch (e) {
      console.error(e);
    }
  }

  cleanup(): void {}

  public addCommand(command: SlashCommandMetadata, target: any) {
    this.commands.push({
      name: command.name,
      key: command.key,
      description: command.description,
      target: target,
    });
  }

  public async responseOnInteraction(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    this.commands.forEach(async (command) => {
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
    return this.commands;
  }

  public getCommandInfo(name: string): ISlashCommand | undefined {
    return this.commands.find((v) => v.name === name);
  }
}
