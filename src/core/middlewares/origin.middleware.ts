import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { isProdMode } from '../../app.environment';
import { CROSS_DOMAIN } from '../../app.config';
import { EHttpStatus, THttpErrorResponse } from '../interfaces/http.interface';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    // 生产环境，验证用户来源渠道，防止非法请求
    if (isProdMode) {
      const { origin, referer } = request.headers;
      const checkHeader = field =>
        !field || field.includes(CROSS_DOMAIN.allowedReferer);
      if (!checkHeader(origin) && !checkHeader(referer)) {
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: EHttpStatus.ERROR,
          message: '您无权访问',
          error: null,
        } as THttpErrorResponse);
      }
    }

    return next();
  }
}
