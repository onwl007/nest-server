import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiErrorCode;

  constructor(errorMessage: string, errorCode: ApiErrorCode, statuserrorCode: HttpStatus) {
    super(errorMessage, statuserrorCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
