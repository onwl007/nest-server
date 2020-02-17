import { Schema, Types, model } from 'mongoose';
import {
  getProviderByModel,
  getModelToken,
} from '../../shared/utils/model.util';
import {
  ArticleSourceEnum,
  ArticleStateEnum,
} from '../../core/constants/module.enum';
import { enumValues } from '../../shared/utils/common.util';

const ArticleSchema = new Schema(
  {
    // 标题
    title: {
      type: String,
      required: true,
      validate: /\S+/,
    },
    // 内容
    content: {
      type: String,
      required: true,
      validate: /\S+/,
    },
    // 描述
    description: {
      type: String,
      default: '',
    },
    // 关键字
    keywords: [
      {
        type: String,
      },
    ],
    // 状态 0 草稿 | 1 已发布
    state: {
      type: Number,
      default: 0,
      enum: enumValues(ArticleStateEnum),
    },
    // 缩略图
    thumb: {
      type: String,
    },
    // 标签
    tag: [
      {
        type: Types.ObjectId,
        ref: 'Tag',
      },
    ],
    // 分类
    category: {
      type: Types.ObjectId,
      ref: 'Category',
    },
    // 来源 0 原创 | 1 转载 | 2 混撰 | 3 翻译
    source: {
      type: Number,
      default: 0,
      enum: enumValues(ArticleSourceEnum),
    },
    // 元数据
    meta: {
      // 点赞数
      likes: {
        type: Number,
        default: 0,
      },
      // 浏览数
      views: {
        type: Number,
        default: 0,
      },
      // 评论数
      comments: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const articleModel = model('Article', ArticleSchema);

export const ArticleProvider = getProviderByModel(articleModel);
export const ArticleModelToken = getModelToken(articleModel.modelName);
