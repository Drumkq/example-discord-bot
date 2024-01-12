import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DiscordModule } from 'src/discord/discord.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModel } from 'src/models/profile/profile.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileModel]), DiscordModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
