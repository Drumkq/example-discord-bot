import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
    example: '0',
  })
  public readonly id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Discord user id',
    example: '573413266012336212',
  })
  public readonly userId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Size of dick',
    example: '15',
  })
  public readonly dickSize: number;
}
