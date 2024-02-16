import { IUser } from './user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserModel implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  userId: string;

  @Column('text', { nullable: true })
  accessToken?: string;

  @Column('text', { nullable: true })
  refreshToken?: string;
}
