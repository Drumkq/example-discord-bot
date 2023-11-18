import { SlashCommandBuilder } from 'discord.js';

export interface ISlashCommandOption {
  name: string;
  description: string;
  required: boolean;

  build: (
    builder: SlashCommandBuilder,
  ) => Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
}
