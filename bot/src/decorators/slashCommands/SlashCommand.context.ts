import { ISlashCommandOption } from './options/slashCommandOption.interface';

export type SlashCommandContext = {
  description: string;
  cooldown?: number;
  name?: string;
  options?: ISlashCommandOption[];
};
