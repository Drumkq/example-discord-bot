import { CommandInteraction, EmbedBuilder, REST, Routes } from 'discord.js';
import { Service } from '../../decorators/service.decorator';
import { Bootstrap } from '../bootstrap.interface';
import { ConfigService } from '../config.service';
import { SlashCommand } from '../../decorators/slashCommands/SlashCommand';
import { SlashCommandCooldownService } from './slashCommandCooldown.service';
import { buildGeneralResponse } from '../../utils/interaction.responses';

export const commandsContext = new Array<SlashCommand>();

@Service
export class SlashCommandService implements Bootstrap {
  private readonly rest: REST;

  constructor(
    private readonly config: ConfigService,
    private readonly cooldowns: SlashCommandCooldownService,
  ) {
    this.rest = new REST({ version: '10' }).setToken(
      config.get<string>('CLIENT_TOKEN'),
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
      if (interaction.commandName === command.context.name) {
        await interaction.deferReply();

        try {
          const elapsedSeconds = this.cooldowns.getElapsedSeconds(
            interaction.user.id,
            interaction.commandName,
          );

          if (!command.context.cooldown) {
            await command.call(interaction);
            return;
          }

          if (!elapsedSeconds) {
            await command.call(interaction);
            this.cooldowns.updateCooldown(
              interaction.user.id,
              interaction.commandName,
            );

            return;
          }

          if (elapsedSeconds > command.context.cooldown) {
            await command.call(interaction);
            this.cooldowns.updateCooldown(
              interaction.user.id,
              interaction.commandName,
            );
          } else {
            await interaction.editReply({
              embeds: [
                buildGeneralResponse(new EmbedBuilder())
                  .setTitle('Command on cooldown')
                  .setDescription(
                    `${new Date(
                      command.context.cooldown - elapsedSeconds,
                    ).getSeconds()} seconds left`,
                  ),
              ],
            });
          }
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
        }
      }
    });
  }

  public getAllCommandsInfo(): Array<SlashCommand> {
    return commandsContext;
  }

  public getCommandInfo(name: string): SlashCommand | undefined {
    return commandsContext.find((v) => v.context.name === name);
  }
}
