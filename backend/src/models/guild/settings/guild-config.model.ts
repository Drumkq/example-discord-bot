import { IWelcomeConfig } from './welcome/welcome.interface';
import { IModerationConfig } from './moderation/moderation.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GuildConfigModel implements IWelcomeConfig, IModerationConfig {
  @PrimaryColumn()
  id: number;

  @Column('text', { unique: true })
  guildId: string;

  @Column('boolean')
  capsCheck: boolean;

  @Column('boolean')
  nsfwCheck: boolean;

  @Column('boolean')
  guildLinksCheck: boolean;

  @Column('simple-array', { array: true })
  roles: string[];

  @Column('text')
  message: string;
}
