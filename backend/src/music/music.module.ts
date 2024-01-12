import { Module } from '@nestjs/common';
import { MusicService } from './music.service';

@Module({
  providers: [MusicService],
})
export class MusicModule {}
