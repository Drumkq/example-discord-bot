import { IsArray, IsOptional, IsString } from 'class-validator';
import { Track } from './track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuildStateDto {
  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: Track,
    description: 'Music queue of the bot',
    example: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'YOUTUBE' },
    ],
    isArray: true,
  })
  public readonly trackQueue: Track[];
}
