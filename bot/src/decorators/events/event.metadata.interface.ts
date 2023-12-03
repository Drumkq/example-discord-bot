import { MethodMetadata } from '../common/methodMetadata';
import { EventContext } from './event.context';

export type EventMetadata = MethodMetadata & EventContext;
