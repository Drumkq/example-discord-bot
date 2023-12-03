import {
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';
import { SlashCommandContext } from './SlashCommand.context';

export class SlashCommand {
  public readonly context: SlashCommandContext;
  private readonly callback: (interaction: CommandInteraction) => void;
  private readonly builder = new SlashCommandBuilder();

  constructor(metadata: SlashCommandMetadata) {
    this.context = metadata;
    this.callback = metadata.target[metadata.key].bind(metadata.target);
  }

  public async call(interaction: CommandInteraction): Promise<void> {
    return await this.callback(interaction);
  }

  public getData(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.builder.toJSON();
  }

  public build(): void {
    this.builder
      .setName(this.context.name!)
      .setDescription(this.context.description);
    this.context.options?.forEach((option) => {
      option.build(this.builder);
    });
  }
}
