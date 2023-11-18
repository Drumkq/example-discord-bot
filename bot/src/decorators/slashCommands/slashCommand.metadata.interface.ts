import { SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from './slashCommand.interface';

export interface SlashCommandMetadata extends ISlashCommand {
  key: string;
  target: any;
  builder: SlashCommandBuilder;
}
