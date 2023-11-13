import { ClientEvents } from 'discord.js';

export interface EventMetadata {
  eventName: keyof ClientEvents;
  key: string;
}
