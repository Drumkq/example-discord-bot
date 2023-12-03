import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public readonly dickSize: number;
}
