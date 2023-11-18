import { SlashCommandBuilder } from 'discord.js';
import { ISlashCommandOption } from './slashCommandOption.interface';

export abstract class Option implements ISlashCommandOption {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly required: boolean,
  ) {}

  abstract build(
    builder: SlashCommandBuilder,
  ): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
}
