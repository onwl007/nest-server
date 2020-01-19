import * as _ from 'lodash';
import { SetMetadata, HttpStatus } from '@nestjs/common';
import * as META from '../constants/meta.constants';
import { TMessage } from '../interfaces/http.interface';

interface IBuildDecoratorOption {
  errCode?: HttpStatus;
  successCode?: HttpStatus;
  errMessage?: TMessage;
  successMessage?: TMessage;
  usePaginate?: boolean;
}

// handle 参数
interface IHandleOption {
  error?: HttpStatus;
  success?: HttpStatus;
  message: TMessage;
  usePaginate?: boolean;
}

type THandleOption = TMessage | IHandleOption;

const buildHttpDecorator = (
  options: IBuildDecoratorOption,
): MethodDecorator => {
  const {
    errMessage,
    successMessage,
    errCode,
    successCode,
    usePaginate,
  } = options;
  return (__, ___, descriptor: PropertyDescriptor) => {
    if (errCode) {
      SetMetadata(META.HTTP_ERROR_CODE, errCode)(descriptor.value);
    }
    if (successCode) {
      SetMetadata(META.HTTP_SUCCESS_CODE, successCode)(descriptor.value);
    }
    if (errMessage) {
      SetMetadata(META.HTTP_ERROR_MESSAGE, errMessage)(descriptor.value);
    }
    if (successMessage) {
      SetMetadata(META.HTTP_SUCCESS_MESSAGE, successMessage)(descriptor.value);
    }
    if (usePaginate) {
      SetMetadata(META.HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value);
    }
    return descriptor;
  };
};

/**
 * 异常响应装饰器
 * @param message 信息
 * @param statusCode 状态码
 * @example @HttpProcessor.success('error message', 500)
 */
export const error = (
  message: TMessage,
  statusCode?: HttpStatus,
): MethodDecorator => {
  return buildHttpDecorator({ errMessage: message, errCode: statusCode });
};

/**
 * 异常响应装饰器
 * @param message 信息
 * @param statusCode 状态码
 * @example @HttpProcessor.success('success message', 200)
 */
export const success = (
  message: TMessage,
  statusCode?: HttpStatus,
): MethodDecorator => {
  return buildHttpDecorator({
    successMessage: message,
    successCode: statusCode,
  });
};

/**
 * 统配装饰器
 * @param args 参数
 * @example @HttpProcessor.handle('获取某项数据')
 * @example @HttpProcessor.handle({ message: '操作', error: error, success: 200 })
 */
export function handle(args: THandleOption): MethodDecorator;
export function handle(...args) {
  const option = args[0];
  const isOption = (value: THandleOption): value is IHandleOption =>
    _.isObject(value);
  const message: TMessage = isOption(option) ? option.message : option;
  const errMessage: TMessage = message + '失败';
  const successMessage: TMessage = message + '成功';
  const errCode: HttpStatus = isOption(option) ? option.error : null;
  const successCode: HttpStatus = isOption(option) ? option.success : null;
  const usePaginate: boolean = isOption(option) ? option.usePaginate : null;
  return buildHttpDecorator({
    errCode,
    successCode,
    errMessage,
    successMessage,
    usePaginate,
  });
}

/**
 * 分页装饰器
 */
export const paginate = (): MethodDecorator => {
  return buildHttpDecorator({ usePaginate: true });
};

export const HttpProcessor = { error, success, handle, paginate };
