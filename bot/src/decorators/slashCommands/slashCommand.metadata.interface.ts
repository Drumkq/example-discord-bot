import { ISlashCommand } from './slashCommand.interface';

export interface SlashCommandMetadata extends ISlashCommand {
  key: string;
  target: any;
}
