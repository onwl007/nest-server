import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errInfo) {
    if (!authInfo && !error && errInfo) {
      throw error ||
        new UnauthorizedException(null, errInfo && errInfo.message);
    }
    return authInfo;
  }
}
