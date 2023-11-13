import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './keys.metadata';
import { ClassMetadata } from './class.metadata.interface';

export function Service(target: NewableFunction) {
  decorate(injectable(), target);
  const metadata: ClassMetadata = {
    target: target,
  };

  Reflect.defineMetadata(METADATA_KEYS.SERVICE, metadata, target);

  let oldMetadata: Array<ClassMetadata> = Reflect.getMetadata(
    METADATA_KEYS.SERVICE,
    Reflect,
  ) as Array<ClassMetadata> | [];
  if (oldMetadata === undefined) {
    oldMetadata = [];
  }

  Reflect.defineMetadata(
    METADATA_KEYS.SERVICE,
    [metadata, ...oldMetadata],
    Reflect,
  );
}
