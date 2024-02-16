import { IWelcomeConfig } from './welcome/welcome.interface';
import { IModerationConfig } from './moderation/moderation.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GuildConfig')
export class GuildConfigModel implements IWelcomeConfig, IModerationConfig {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  guildId: string;

  @Column()
  capsCheck: boolean;

  @Column()
  nsfwCheck: boolean;

  @Column()
  guildLinksCheck: boolean;

  @Column('text', { nullable: true })
  rolesStr?: string;

  roles?: string[] = this.rolesStr?.split(' ');

  @Column('text')
  message: string;
}
