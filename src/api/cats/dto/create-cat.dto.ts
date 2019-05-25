import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';
import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiCode } from '../../../common/enums/api-code.enum';

function getError(msg, code, api) {
  return {
    message: msg,
    context: {
      apiCode: api,
      errorCode: code,
    },
  };
}

export class CreateCatDto {
  @IsNotEmpty(getError('姓名不可缺少', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  @IsString(getError('姓名必须是字符串类型', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  readonly name: string;

  @IsNotEmpty(getError('年龄不可缺少', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  @IsInt(getError('年龄必须是数字', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  @Min(1, getError('年龄必须大于1', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  @Max(200, getError('年龄必须小于200', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  readonly age: number;

  @IsString(getError('品种必须是字符串', ApiErrorCode.PARAM_ERR, ApiCode.POST_CAT))
  readonly breed: string;
}
