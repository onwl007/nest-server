import { Document, Schema } from 'mongoose';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayUnique,
  IsEnum,
} from 'class-validator';
import {
  ArticleStateEnum,
  ArticleSourceEnum,
} from 'src/core/constants/module.enum';

export class ArticleMeta {
  @IsInt()
  likes: number;

  @IsInt()
  views: number;

  @IsInt()
  comments: number;
}

export class Article extends Document {
  @IsString({ message: '字符串?' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @IsString({ message: '字符串?' })
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsString({ message: '字符串?' })
  description: string;

  @IsArray()
  @ArrayUnique()
  keywords: string[];

  @IsInt()
  @IsEnum(ArticleStateEnum)
  state: number;

  @IsString({ message: '字符串' })
  thumb: string;

  tag: Schema.Types.ObjectId[];

  category: Schema.Types.ObjectId;

  @IsInt()
  @IsEnum(ArticleSourceEnum)
  source: number;

  meta: ArticleMeta;
}
