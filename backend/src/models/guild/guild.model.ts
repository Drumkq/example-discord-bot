import { Column, Model, Table } from 'sequelize-typescript';
import { BOOLEAN, NUMBER, STRING } from 'sequelize';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

@Table({ timestamps: false, tableName: 'Guilds' })
export class GuildModel extends Model<IGuild> {
  @Column({
    primaryKey: true,
    unique: true,
    type: NUMBER,
    validate: { notEmpty: true },
  })
  id: number;

  @Column({
    unique: true,
    type: STRING,
    validate: { notEmpty: true },
  })
  guildId: string;

  @Column({
    type: BOOLEAN,
    validate: { notEmpty: true },
  })
  botInvited: boolean;

  @Column({
    unique: true,
    type: STRING,
    validate: { notEmpty: true },
  })
  ownerId: string;

  @Column({
    type: STRING,
    get(): string {
      return this.getDataValue('coownerIds').split(';');
    },
    set(val: string[]) {
      this.setDataValue('coownerIds', val.join(';'));
    },
  })
  coownerIds?: string[];

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
