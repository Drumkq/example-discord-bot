import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './keys.metadata';
import { ClassMetadata } from './class.metadata.interface';

export function Controller(target: NewableFunction) {
  decorate(injectable(), target);
  const metadata: ClassMetadata = {
    target: target,
  };

  Reflect.defineMetadata(METADATA_KEYS.CONTROLLER, metadata, target);

  let oldMetadata: Array<ClassMetadata> = Reflect.getMetadata(
    METADATA_KEYS.CONTROLLER,
    Reflect,
  ) as Array<ClassMetadata> | [];
  if (oldMetadata === undefined) {
    oldMetadata = [];
  }

  Reflect.defineMetadata(
    METADATA_KEYS.CONTROLLER,
    [metadata, ...oldMetadata],
    Reflect,
  );
}
