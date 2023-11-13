import { ClientEvents } from 'discord.js';
import { EventMetadata } from './event.metadata.interface';
import { METADATA_KEYS } from '../keys.metadata';

export function On(eventName: keyof ClientEvents) {
  return function (target: any, propertyKey: string) {
    const metadata: EventMetadata = {
      eventName: eventName,
      key: propertyKey,
    };

    let metadataList: Array<EventMetadata> = [];
    if (!Reflect.hasOwnMetadata(METADATA_KEYS.ON_EVENT, target.constructor)) {
      Reflect.defineMetadata(
        METADATA_KEYS.ON_EVENT,
        metadataList,
        target.constructor,
      );
    } else {
      metadataList = Reflect.getOwnMetadata(
        METADATA_KEYS.ON_EVENT,
        target.constructor,
      ) as Array<EventMetadata>;
    }

    metadataList.push(metadata);
  };
}
