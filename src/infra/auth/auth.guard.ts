import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
const jwt = require('jsonwebtoken');

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({});
  }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const auth = request.headers?.authorization?.split(' ');
      if (!auth || auth.lenght < 2) {
        throw new UnauthorizedException();
      }
      const token = auth[1];
      const body = jwt.verify(token, process.env.JWT_AUTH_KEY);
      if (
        body.login !== process.env.LOGIN ||
        body.password !== process.env.PASSWORD
      ) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
