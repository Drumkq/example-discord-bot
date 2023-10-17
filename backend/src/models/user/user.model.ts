import { Column, Model, Table } from 'sequelize-typescript';
import { NUMBER, STRING } from 'sequelize';
import { IUser } from './user.interface';

@Table({ timestamps: false, tableName: 'Users' })
export class UserModel extends Model<IUser> {
  @Column({
    primaryKey: true,
    unique: true,
    type: NUMBER,
    validate: { notEmpty: true, isNumeric: true },
  })
  id: number;

  @Column({
    unique: true,
    type: STRING,
    validate: { notEmpty: true },
  })
  userId: string;

  @Column({
    type: STRING,
  })
  accessToken?: string;

  @Column({
    type: STRING,
  })
  refreshToken?: string;
}
