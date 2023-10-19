import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/user/user.model';
import { DiscordModule } from 'src/discord/discord.module';
import { GuildModule } from 'src/guild/guild.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    DiscordModule,
    GuildModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
