// 元数据常量键，用于全局装饰器元信息的常量键
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

export const HTTP_ERROR_CODE = '__customHttpErrorCode__';
export const HTTP_SUCCESS_CODE = HTTP_CODE_METADATA;
export const HTTP_MESSAGE = '__customHttpMessage__';
export const HTTP_ERROR_MESSAGE = '__customHttpErrorMessage__';
export const HTTP_SUCCESS_MESSAGE = '__customHttpSuccessMessage__';
export const HTTP_RES_TRANSFORM_PAGINATE = '__customHttpResTransformPagenate__';
