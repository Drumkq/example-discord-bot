import { ISlashCommandOption } from './options/slashCommandOption.interface';

export type SlashCommandContext = {
  description: string;
  name?: string;
  options?: ISlashCommandOption[];
};
