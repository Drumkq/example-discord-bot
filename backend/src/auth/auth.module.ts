import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { DiscordStraregy } from './strategies/discord.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './serializer/session.serializer';
import { ApiKeyStraregy } from './strategies/apikey.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user/user.model';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserModel]),
    ConfigModule,
  ],
  providers: [AuthService, DiscordStraregy, ApiKeyStraregy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
