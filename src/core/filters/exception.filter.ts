/*
 * @Desc: 异常过滤器
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 10:35:58
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:40:46
 */

import * as _ from 'lodash';
import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  TExceptionOption,
  TMessage,
  THttpErrorResponse,
  EHttpStatus,
} from '../interfaces/http.interface';
import { isDevMode } from '../../app.environment';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
    const isString = (value): value is TMessage => _.isString(value);
    const errMessage = isString(errorOption)
      ? errorOption
      : errorOption.message;
    const errorInfo = isString(errorOption) ? null : errorOption.error;
    const data: THttpErrorResponse = {
      status: EHttpStatus.ERROR,
      message: errMessage,
      error: errorInfo,
      debug: isDevMode ? exception.stack : null,
    };
    return response.status(status).jsonp(data);
  }
}
