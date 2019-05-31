/**
 * @description 评论模型
 */

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CommentSchema = new mongoose.Schema({
  // 内容
  content: { type: String, required: true },
  // markdown 渲染后的内容
  renderedContent: { type: String, required: true },
  // 状态 -2 垃圾评论 | -1 隐藏 | 0 待审核 | 1 通过
  state: { type: Number, default: 0 },
  // Akismet 判定是否为垃圾评论
  spam: { type: Boolean, default: false },
  // 评论发布者
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  // 点赞数
  ups: { type: Number, default: 0 },
  // 是否置顶
  sticky: { type: Number, default: 0 },
  // 类型 0 文章评论 | 1 站内留言 | 2 其他
  type: { type: Number, default: 0 },
  // 文章 type为 0 时存在，表示文章的评论
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
  // 用户数据
  meta: {
    // ip
    ip: String,
    // IP 所在地
    location: Object,
    // user agent
    ua: String,
    // refer
    refer: { type: String, default: '' },
  },
  // ****** 子评论 ******
  // 父评论 parent 和 forward 二者必须同时存在
  parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
  // 前一条评论 ID，可以是 parent 的 ID，
  // 比如 B 评论是 A 评论的回复，则 B.forward._id = A._id，
  // 主要是为了查看评论对话的评论数构建
  forward: { type: Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true });
