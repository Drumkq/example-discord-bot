import { ISlashCommandOption } from './options/slashCommandOption.interface';

export interface ISlashCommand {
  name?: string;
  description: string;
  options?: ISlashCommandOption[];
}
