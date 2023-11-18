import {
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { SlashCommandContext } from './SlashCommand.context';

export interface ISlashCommand extends SlashCommandContext {
  build: () => void;
  getData: () => RESTPostAPIChatInputApplicationCommandsJSONBody;
  call: (interaction: CommandInteraction) => void;
}
