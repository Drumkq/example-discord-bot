import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserModel } from './models/user/user.model';
import { GuildModule } from './guild/guild.module';
import { GuildModel } from './models/guild/guild.model';
import { ThrottlerModule } from '@nestjs/throttler';
import { DiscordModule } from './discord/discord.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { ProfileModel } from './models/profile/profile.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1jvc19Dk',
      database: 'nest_db',
      models: [UserModel, GuildModel, ProfileModel],
    }),
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
  ],
  controllers: [ProfileController],
  providers: [],
})
export class AppModule {}
