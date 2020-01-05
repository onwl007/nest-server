/*
 * @Desc: HTTP 响应接口
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 09:58:17
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:36:33
 */

export enum EHttpStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export type TMessage = string;
export type TExceptionOption = TMessage | { message: TMessage; error?: any };

export interface IHttpResultPaginate<T> {
  data: T;
  params: any;
  pagination: {
    total: number;
    current_page: number;
    total_page: number;
    per_page: number;
  };
}

export interface IHttpResponseBase {
  status: EHttpStatus;
  message: TMessage;
}

// 错误返回
export type THttpErrorResponse = IHttpResponseBase & {
  error: any;
  debug?: string;
};

// 成功返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  result: T | IHttpResultPaginate<T>;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;
