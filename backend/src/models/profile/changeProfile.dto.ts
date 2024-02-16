import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Size of dick',
    example: '15',
  })
  public readonly dickSize: number;
}
