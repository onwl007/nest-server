import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      response
      .status(status)
      .json({
        code: exception.getErrorCode(),
        messgae: exception.getErrorMessage(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response
      .status(status)
      .json({
        code: exception.getStatus(),
        messgae: null,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
