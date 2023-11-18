import { METADATA_KEYS } from '../keys.metadata';
import { SlashCommandContext } from './SlashCommand.context';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';
import { getMethodMetadata } from '../../utils/reflect';

export function SlashCommand(context: SlashCommandContext) {
  return function (target: any, propertyKey: string) {
    const metadata: SlashCommandMetadata = {
      description: context.description,
      options: context.options,
      name: context.name,
      key: propertyKey,
      target: null, // Pass null target, because decorator hasn't access to the instance of the class
    };

    let metadataList: Array<SlashCommandMetadata> = [];
    if (
      !Reflect.hasOwnMetadata(METADATA_KEYS.SLASH_COMMAND, target.constructor)
    ) {
      Reflect.defineMetadata(
        METADATA_KEYS.SLASH_COMMAND,
        metadataList,
        target.constructor,
      );
    } else {
      metadataList = getMethodMetadata<SlashCommandMetadata>(
        METADATA_KEYS.SLASH_COMMAND,
        target,
      );
    }

    metadataList.push(metadata);
  };
}
