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

export class CreateGuildDto {
  @IsString()
  @ApiProperty({
    example: '0',
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Discord guild id',
    example: '1061281219892067412',
  })
  public readonly guildId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is bot on the server',
    example: 'true',
  })
  public readonly botInvited: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `User's owner id`,
    example: '517876972060203215',
  })
  public readonly ownerId: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: `Coowner's ids`,
    example: ['1', '2', '3'],
    isArray: true,
  })
  public readonly coownerIds?: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Icon url',
    example: 'https://iconhost.com/icon',
  })
  public readonly icon: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Guild name',
    example: 'Awesome guild',
  })
  public readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsDivisibleBy(2)
  @ApiProperty({
    description: `Service's features enabled for this guild`,
    example: '8',
  })
  public readonly features: Features;
}
