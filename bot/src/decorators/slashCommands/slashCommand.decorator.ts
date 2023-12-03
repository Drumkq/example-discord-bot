import { SlashCommandMetadata } from './slashCommand.metadata.interface';
import { SlashCommandContext } from './SlashCommand.context';
import { registerMethod } from '../common/registerMethod';
import { METADATA_KEYS } from '../keys.metadata';

export function SlashCommand(context: SlashCommandContext) {
  return function (target: any, propertyKey: string) {
    const metadata: SlashCommandMetadata = {
      ...context,
      name: context.name || propertyKey,
      key: propertyKey,
      target: null, // Pass null target, because decorator hasn't access to the instance of the class
    };

    registerMethod(target.constructor, metadata, METADATA_KEYS.SLASH_COMMAND);
  };
}
