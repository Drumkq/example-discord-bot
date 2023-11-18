import {
  ApplicationCommandOptionBase,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from 'discord.js';
import { ISlashCommandOption } from './slashCommandOption.interface';

export abstract class Option implements ISlashCommandOption {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly required: boolean,
  ) {}

  public abstract build(
    builder: SlashCommandBuilder,
  ): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  protected setupGeneralInformation<
    T extends
      | SlashCommandRoleOption
      | SlashCommandUserOption
      | SlashCommandNumberOption
      | SlashCommandStringOption
      | SlashCommandBooleanOption
      | SlashCommandChannelOption
      | SlashCommandIntegerOption
      | SlashCommandAttachmentOption
      | SlashCommandMentionableOption
      | ApplicationCommandOptionBase,
  >(builder: ApplicationCommandOptionBase): T {
    return builder
      .setName(this.name)
      .setDescription(this.description)
      .setRequired(this.required) as T;
  }
}
