import { METADATA_KEYS } from '../keys.metadata';
import { ISlashCommand } from './slashCommand.interface';
import { SlashCommandMetadata } from './slashCommand.metadata.interface';

export function SlashCommand(context: ISlashCommand) {
  return function (target: any, propertyKey: string) {
    const metadata: SlashCommandMetadata = {
      name: context.name || propertyKey,
      description: context.description || '',
      key: propertyKey,
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
