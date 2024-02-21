import { IsEnum, IsString } from 'class-validator';
import { TrackType } from '../enums/track-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @IsString()
  @ApiProperty({
    description: 'Url to track',
    example: 'https://www.youtube.com/watch?v=HEXWRTEbj1I',
  })
  public readonly url: string;

  @IsEnum(TrackType)
  @ApiProperty({
    enum: TrackType,
    description: 'Track type',
    example: TrackType.YouTube,
  })
  public readonly type: TrackType;
}
