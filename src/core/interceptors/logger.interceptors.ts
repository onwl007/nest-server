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

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  // @Inject('WINSTON_LOGGER')
  // private readonly logger: Logger;
  constructor(@Inject('WINSTON_LOGGER') private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    // if (process.env.NODE_ENV === 'development') {
    //   return call$;
    // }
    const request = context.switchToHttp().getRequest();
    const content = `${request.method} -> ${request.url}`;
    this.logger.log('+++ 收到请求', content);
    const now = Date.now();
    return call$.pipe(
      tap(() =>
        this.logger.log('--- 响应请求：', content, `${Date.now() - now}ms`),
      ),
    );
  }
}
