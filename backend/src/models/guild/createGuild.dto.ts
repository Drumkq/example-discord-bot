import {
  IsArray,
  IsBoolean,
  IsDivisibleBy,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

export class CreateGuildDto implements IGuild {
  @IsOptional()
  @IsNumber()
  public readonly id: number;

  @IsNotEmpty()
  @IsString()
  public readonly guildId: string;

  @IsNotEmpty()
  @IsBoolean()
  public readonly botInvited: boolean;

  @IsNotEmpty()
  @IsString()
  public readonly ownerId: string;

  @IsArray()
  public readonly coownerIds?: string[];

  @IsNotEmpty()
  @IsString()
  public readonly icon: string;

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsDivisibleBy(2)
  public readonly features: Features;
}
