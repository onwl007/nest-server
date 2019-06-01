import { ApiCode, ApiErrorCode, getError } from '../../../common';
import { IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty(getError('分类名称不可缺少', ApiErrorCode.POST_CATEGORY_ERR, ApiCode.POST_CATEGORY))
  @IsString(getError('分类名称必须是字符串类型', ApiErrorCode.POST_CATEGORY_ERR, ApiCode.POST_CATEGORY))
  readonly name: string;

  @IsOptional()
  @IsString(getError('分类描述必须是字符串类型', ApiErrorCode.POST_CATEGORY_ERR, ApiCode.POST_CATEGORY))
  readonly description: string;
}
