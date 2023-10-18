import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordGuard extends AuthGuard('discord') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest();

    if (!req.isAuthenticated()) {
      await super.logIn(req);
    }

    return res;
  }
}
