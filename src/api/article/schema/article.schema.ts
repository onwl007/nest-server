/**
 * @description 文章模型
 */

import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  // 标题
  title: { type: String, required: true },
  // 关键字
  keyword: [{ type: String }],
  // 文章摘要
  description: { type: String },
  // 标签
  tag: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  // 分类
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  // 内容
  content: { type: String, required: true },
  // markdown 渲染后的 html 内容
  renderedContent: { type: String, required: false },
  // 来源 0 原创 | 1 转载 | 2 翻译
  source: { type: Number, default: 0 },
  // source 为 1 时，来源连接地址
  from: { type: String },
  // 缩略图
  thumb: { type: String },
  // 状态 0 草稿 | 1 发布
  state: { type: Number, default: 0 },
  // 文章数据 浏览量 | 点赞量 | 评论数
  meta: {
    pvs: { type: Number, default: 0 },
    ups: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
}, { timestamps: true });
