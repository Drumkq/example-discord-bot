import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './keys.metadata';
import { ClassMetadata } from './class.metadata.interface';
import { registerClass } from './common/registerClass';

export function Service(target: NewableFunction) {
  decorate(injectable(), target);
  const metadata: ClassMetadata = {
    target: target,
  };

  registerClass(target, metadata, METADATA_KEYS.SERVICE);
}
