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
