import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import {
  THttpSuccessResponse,
  EHttpStatus,
  IHttpResultPaginate,
  TMessage,
} from '../interfaces/http.interface';
import * as META from '../constants/meta.constants';

export function transformDataToPaginate<T>(
  data: PaginateResult<T>,
  request?: any,
): IHttpResultPaginate<T[]> {
  return {
    data: data.docs,
    params: request ? request.query : null,
    pagination: {
      total: data.total,
      current_page: data.page,
      total_page: data.pages,
      per_page: data.limit,
    },
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpSuccessResponse<T>> {
  constructor(private readonly reflecor: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<THttpSuccessResponse<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const message =
      this.reflecor.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || '成功';
    const usePaginate = this.reflecor.get<boolean>(
      META.HTTP_RES_TRANSFORM_PAGINATE,
      target,
    );
    return call$.pipe(
      map((data: any) => {
        const result = !usePaginate
          ? data
          : transformDataToPaginate<T>(data, request);
        return { status: EHttpStatus.SUCCESS, message, result };
      }),
    );
  }
}
