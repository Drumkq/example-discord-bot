import { Module } from '@nestjs/common';
import { GuildStateService } from './guild-state.service';

@Module({
  providers: [GuildStateService],
})
export class GuildStateModule {}
