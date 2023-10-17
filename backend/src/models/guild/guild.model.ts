import { Column, Model, Table } from 'sequelize-typescript';
import { NUMBER, STRING } from 'sequelize';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

@Table({ timestamps: false, tableName: 'Guilds' })
export class GuildModel extends Model<IGuild> {
  @Column({
    primaryKey: true,
    unique: true,
    type: NUMBER,
    validate: { notEmpty: true, isUUID: 4 },
  })
  id: number;

  @Column({
    unique: true,
    type: STRING,
    validate: { notEmpty: true },
  })
  guildId: string;

  @Column({
    unique: true,
    type: STRING,
    validate: { notEmpty: true },
  })
  ownerId: string;

  @Column({
    type: STRING,
    validate: { notEmpty: true },
  })
  icon: string;

  @Column({
    type: STRING,
    validate: { notEmpty: true },
  })
  name: string;

  @Column({
    type: NUMBER,
    validate: { notEmpty: true },
  })
  features: Features;
}
