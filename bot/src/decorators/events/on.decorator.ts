import { EventMetadata } from './event.metadata.interface';
import { METADATA_KEYS } from '../keys.metadata';
import { registerMethod } from '../common/registerMethod';
import { EventContext } from './event.context';

export function On(context: EventContext) {
  return function (target: any, propertyKey: string) {
    const metadata: EventMetadata = {
      ...context,
      key: propertyKey,
      target: null,
    };

    registerMethod(target.constructor, metadata, METADATA_KEYS.ON_EVENT);
  };
}
