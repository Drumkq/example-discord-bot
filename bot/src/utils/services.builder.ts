import { Container } from 'inversify';
import { METADATA_KEYS } from '../decorators/keys.metadata';
import { getClassMetadata } from './reflect';
import { ServiceSymbol } from '../services';
import { ClassMetadata } from '../decorators/class.metadata.interface';

export class ServicesBuilder {
  constructor(private readonly container: Container) {}

  build(): void {
    getClassMetadata<ClassMetadata>(METADATA_KEYS.SERVICE, Reflect).forEach(
      (service) => {
        this.container
          .bind(ServiceSymbol)
          .to(service.target as new (...args: Array<never>) => unknown)
          .inSingletonScope();
      },
    );
  }
}
