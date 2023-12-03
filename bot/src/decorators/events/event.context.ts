import { ClientEvents } from 'discord.js';

export type EventContext = {
  name: keyof ClientEvents;
};
