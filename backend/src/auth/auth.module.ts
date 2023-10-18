import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { DiscordStraregy } from './strategies/discord.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from './serializer/session.serializer';
import { ApiKeyStraregy } from './strategies/apikey.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule,
    UserModule,
  ],
  providers: [AuthService, DiscordStraregy, ApiKeyStraregy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
