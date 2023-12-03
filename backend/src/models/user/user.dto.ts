import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  public readonly id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly accessToken?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly refreshToken?: string;
}
