import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProfile } from './profile.interface';

@Entity('Profile')
export class ProfileModel implements IProfile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  userId: string;

  @Column({ default: 0 })
  dickSize: number;
}
