import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

@Entity('Guild')
export class GuildModel implements IGuild {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('varchar', { unique: true })
  public guildId: string;

  @Column()
  public botInvited: boolean;

  @Column('text')
  public ownerId: string;

  @Column('text', { nullable: true, name: 'coownerIds' })
  public coownerIdsStr?: string;

  public coownerIds?: string[] = this.coownerIdsStr?.split(' ');

  @Column('text')
  public icon: string;

  @Column('text')
  public name: string;

  @Column('int', { default: 0 })
  public features: Features;
}
