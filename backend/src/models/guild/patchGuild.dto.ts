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
import { ApiProperty } from '@nestjs/swagger';

export class PatchGuildDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is bot on the server',
  })
  public readonly botInvited: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `User's owner id`,
  })
  public readonly ownerId: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: `Coowner's ids`,
    isArray: true,
  })
  public readonly coownerIds?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Icon url',
  })
  public readonly icon: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Guild name',
  })
  public readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsDivisibleBy(2)
  @ApiProperty({
    description: `Service's features enabled for this guild`,
  })
  public readonly features: Features;
}
