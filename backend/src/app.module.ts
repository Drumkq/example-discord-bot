import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GuildModule } from './guild/guild.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DiscordModule } from './discord/discord.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { GuildStateModule } from './guild-state/guild-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/db/data-source';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

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
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CacheModule.register({
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          host: config.get<string>('REDIS_URI'),
        }),
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    GuildModule,
    DiscordModule,
    ProfileModule,
    GuildStateModule,
  ],
  controllers: [ProfileController],
  providers: [],
})
export class AppModule {}
