import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The id of the user in database',
    example: '0',
  })
  public readonly id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Discord user id',
    example: '831094463133935428',
  })
  public readonly userId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Discord API access token',
  })
  public readonly accessToken?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Discord API refresh token',
  })
  public readonly refreshToken?: string;
}
