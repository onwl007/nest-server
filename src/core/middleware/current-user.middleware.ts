import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void) {
      res.locals.current_user = null;
      const { user } = req;
      if (!user) {
        next();
      } else {
        res.locals.current_user = user;
        next();
      }
    }
}
