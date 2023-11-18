import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from './slashCommand.interface';
import { ISlashCommandOption } from './options/slashCommandOption.interface';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';

export class SlashCommand implements ISlashCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly options: ISlashCommandOption[];

  private readonly callback: (interaction: CommandInteraction) => void;
  private readonly builder = new SlashCommandBuilder();

  constructor(metadata: SlashCommandMetadata) {
    this.name = metadata.name || metadata.key;
    this.description = metadata.description;
    this.options = metadata.options || [];
    this.callback = metadata.target[metadata.key].bind(metadata.target);
  }

  call(interaction: CommandInteraction) {
    return this.callback(interaction);
  }

  getData() {
    return this.builder.toJSON();
  }

  build() {
    this.builder.setName(this.name).setDescription(this.description);
    this.options.forEach((option) => {
      option.build(this.builder);
    });
  }
}
