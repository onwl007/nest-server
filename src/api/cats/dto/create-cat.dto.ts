import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';
import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

function getError(msg, code) {
  return {
    message: msg,
    context: {
      errorCode: code,
    },
  };
}

export class CreateCatDto {
  @IsNotEmpty(getError('姓名不可缺少', ApiErrorCode.PARAM_ERR))
  @IsString(getError('姓名必须是字符串类型', ApiErrorCode.PARAM_ERR))
  readonly name: string;

  @IsNotEmpty(getError('年龄不可缺少', ApiErrorCode.PARAM_ERR))
  @IsInt(getError('年龄必须是数字', ApiErrorCode.PARAM_ERR))
  @Min(1, getError('年龄必须大于1', ApiErrorCode.PARAM_ERR))
  @Max(200, getError('年龄必须小于200', ApiErrorCode.PARAM_ERR))
  readonly age: number;

  @IsString(getError('品种必须是字符串', ApiErrorCode.PARAM_ERR))
  readonly breed: string;
}
