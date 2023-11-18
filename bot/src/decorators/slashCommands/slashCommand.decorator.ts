import { SlashCommandBuilder } from 'discord.js';
import { METADATA_KEYS } from '../keys.metadata';
import { ISlashCommand } from './slashCommand.interface';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';
import { getMethodMetadata } from '../../utils/reflect';

export function SlashCommand(context: ISlashCommand) {
  return function (target: any, propertyKey: string) {
    const metadata: SlashCommandMetadata = {
      description: context.description || '',
      builder: new SlashCommandBuilder(),
      name: context.name || propertyKey,
      options: context.options || [],
      key: propertyKey,
      target: null, // We passing `null`, because can't get target instance here
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
