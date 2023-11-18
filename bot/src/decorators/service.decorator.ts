import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './keys.metadata';
import { ClassMetadata } from './class.metadata.interface';
import { getClassMetadata } from '../utils/reflect';

export function Service(target: NewableFunction) {
  decorate(injectable(), target);
  const metadata: ClassMetadata = {
    target: target,
  };

  Reflect.defineMetadata(METADATA_KEYS.SERVICE, metadata, target);

  const oldMetadata = getClassMetadata<ClassMetadata>(
    METADATA_KEYS.SERVICE,
    Reflect,
  );

  Reflect.defineMetadata(
    METADATA_KEYS.SERVICE,
    [metadata, ...oldMetadata],
    Reflect,
  );
}
