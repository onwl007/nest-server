import { ApiCode, ApiErrorCode, getError } from '../../../common';
import { IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty(getError('标签名称不可缺少', ApiErrorCode.POST_TAG_ERR, ApiCode.POST_TAG))
  @IsString(getError('标签名称必须是字符串类型', ApiErrorCode.POST_TAG_ERR, ApiCode.POST_TAG))
  readonly name: string;

  @IsOptional()
  @IsString(getError('标签描述必须是字符串类型', ApiErrorCode.POST_TAG_ERR, ApiCode.POST_TAG))
  readonly description: string;
}
