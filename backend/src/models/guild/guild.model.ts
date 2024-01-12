import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

@Entity('Guild')
export class GuildModel implements IGuild {
  @PrimaryColumn()
  id: number;

  @Column('text', { unique: true })
  guildId: string;

  @Column('boolean')
  botInvited: boolean;

  @Column('text')
  ownerId: string;

  @Column('simple-array', { array: true })
  coownerIds?: string[];

  @Column('text')
  icon: string;

  @Column('text')
  name: string;

  @Column('int', { default: 0 })
  features: Features;
}
