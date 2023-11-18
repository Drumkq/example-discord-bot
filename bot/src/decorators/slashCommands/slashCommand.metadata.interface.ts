import { SlashCommandContext } from './SlashCommand.context';

export type SlashCommandMetadata = {
  key: string;
  target: any;
} & SlashCommandContext;
