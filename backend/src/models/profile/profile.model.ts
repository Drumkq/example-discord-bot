import { Column, Model, Table } from 'sequelize-typescript';
import { NUMBER, STRING } from 'sequelize';
import { IProfile } from './profile.interface';

@Table({ timestamps: false, tableName: 'Profiles' })
export class ProfileModel extends Model<IProfile> {
  @Column({
    primaryKey: true,
    unique: true,
    type: NUMBER,
    defaultValue: 0,
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
    primaryKey: true,
    unique: true,
    type: NUMBER,
    defaultValue: 0,
    validate: { notEmpty: true, isNumeric: true },
  })
  dickSize: number;
}
