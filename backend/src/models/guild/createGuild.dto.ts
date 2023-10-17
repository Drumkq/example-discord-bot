import {
  IsDivisibleBy,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Features } from '../utils/features.enum';
import { IGuild } from './guild.interface';

export class CreateGuildDto implements IGuild {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public readonly id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly guildId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly ownerId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(2)
  features: Features;
}
