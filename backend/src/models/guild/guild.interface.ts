import { Features } from '../utils/features.enum';

export interface IGuild {
  id: number;
  guildId: string;
  ownerId: string;
  icon: string;
  name: string;
  features: Features;
}
