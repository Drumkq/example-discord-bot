import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from 'src/models/user/user.interface';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as IUser;
  },
);
