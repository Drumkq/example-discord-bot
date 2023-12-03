import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileModel } from 'src/models/profile/profile.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './profile.controller';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [SequelizeModule.forFeature([ProfileModel]), DiscordModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
