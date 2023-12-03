import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ChangeProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public readonly dickSize: number;
}
