import { Module } from '@nestjs/common';
import { GuildStateService } from './guild-state.service';
import { GuildStateController } from './guild-state.controller';

@Module({
  providers: [GuildStateService],
  controllers: [GuildStateController],
})
export class GuildStateModule {}
