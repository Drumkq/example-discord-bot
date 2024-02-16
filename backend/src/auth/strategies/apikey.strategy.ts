import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStraregy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly authService: AuthService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  async validate(apiKey: string, done: (error: Error, data) => void) {
    if (await this.authService.validateKey(apiKey)) {
      done(null, true);
      return;
    }

    done(new UnauthorizedException(), null);
  }
}
