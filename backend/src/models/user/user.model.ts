import { IUser } from './user.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserModel implements IUser {
  @PrimaryColumn()
  id: number;

  @Column('text', { unique: true })
  userId: string;

  @Column('text', { nullable: true })
  accessToken?: string;

  @Column('text', { nullable: true })
  refreshToken?: string;
}
