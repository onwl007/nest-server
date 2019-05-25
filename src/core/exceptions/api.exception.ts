import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiCode } from '../../common/enums/api-code.enum';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiErrorCode;
  private apiCode: ApiCode;

  constructor(apiCode: ApiCode, errorCode: ApiErrorCode, errorMessage: string, statuserrorCode: HttpStatus) {
    super(errorMessage, statuserrorCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.apiCode = apiCode;
  }

  getApiCode(): ApiCode {
    return this.apiCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
