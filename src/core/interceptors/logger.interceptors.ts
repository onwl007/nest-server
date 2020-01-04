import {
  NestInterceptor,
  Injectable,
  Inject,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_LOGGER_TOKEN } from '../constants/system.constants';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_LOGGER_TOKEN) private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    const req = context.switchToHttp().getRequest();
    // TODO: 用户请求的真实 IP
    // inject ip behind Nginx
    // Note: we cannot overwrite req.ip: http://stackoverflow.com/a/33113848/1548043
    this.logger.info(
      '+++ 收到请求: %s %s from %s with query %o and body %o',
      req.method,
      req.url,
      req.ip,
      req.query,
      req.body,
    );
    const now = Date.now();
    return call$.pipe(
      tap(() =>
        this.logger.info(
          '--- 响应请求: %s %s - %s',
          req.method,
          req.url,
          `${Date.now() - now}ms`,
        ),
      ),
    );
  }
}
