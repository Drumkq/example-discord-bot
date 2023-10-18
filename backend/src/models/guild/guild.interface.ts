import { Features } from '../utils/features.enum';

export interface IGuild {
  id: number;
  guildId: string;
  botInvited: boolean;
  ownerId: string;
  coownerIds?: string[];
  icon: string;
  name: string;
  features: Features;
}
