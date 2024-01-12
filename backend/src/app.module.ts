import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GuildModule } from './guild/guild.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DiscordModule } from './discord/discord.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { MusicModule } from './music/music.module';
import { GuildStateModule } from './guild-state/guild-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 2500,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 15000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 45000,
        limit: 100,
      },
    ]),
    AuthModule,
    UserModule,
    GuildModule,
    DiscordModule,
    ProfileModule,
    MusicModule,
    GuildStateModule,
  ],
  controllers: [ProfileController],
  providers: [],
})
export class AppModule {}
