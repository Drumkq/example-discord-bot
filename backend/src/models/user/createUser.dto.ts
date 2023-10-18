import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUser } from './user.interface';

export class CreateUserDto implements IUser {
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
