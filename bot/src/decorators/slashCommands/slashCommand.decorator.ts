import { SlashCommandBuilder } from 'discord.js';
import { METADATA_KEYS } from '../keys.metadata';
import { ISlashCommand } from './slashCommand.interface';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';

export function SlashCommand(context: ISlashCommand) {
  return function (target: any, propertyKey: string) {
    const metadata: SlashCommandMetadata = {
      name: context.name || propertyKey,
      description: context.description || '',
      options: context.options || [],
      key: propertyKey,
      target: null, // Decorator accepts only class method, can't get target instance
      builder: new SlashCommandBuilder(),
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
      metadataList = Reflect.getOwnMetadata(
        METADATA_KEYS.SLASH_COMMAND,
        target.constructor,
      ) as Array<SlashCommandMetadata>;
    }

    metadataList.push(metadata);
  };
}
