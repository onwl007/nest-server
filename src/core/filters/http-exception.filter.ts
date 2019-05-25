import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      Logger.error(`===api: ${exception.getApiCode()} ===code: ${exception.getErrorCode()} ===errMsg: ${exception.getErrorMessage()}==`);
      response
      .status(status)
      .json({
        code: exception.getErrorCode(),
        messgae: exception.getErrorMessage(),
        data: null,
      });
    } else {
      Logger.error(`===api: null ===code: ${exception.getStatus()} ===errMsg: null ==`);
      response
      .status(status)
      .json({
        code: status,
        messgae: exception && exception.message && exception.message.error,
        data: null,
      });
    }
  }
}
