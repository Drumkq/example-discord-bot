import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IProfile } from './profile.interface';

@Entity('Profile')
export class ProfileModel implements IProfile {
  @PrimaryColumn()
  id: number;

  @Column('text', { unique: true })
  userId: string;

  @Column('int', { default: 0 })
  dickSize: number;
}
