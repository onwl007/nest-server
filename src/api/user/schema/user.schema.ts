/**
 * @description 用户模型
 */

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  // 用户名
  username: { type: String, required: true },
  // 姓名
  name: { type: String, required: true },
  // 邮箱
  email: { type: String, required: true },
  // 头像
  avatar: { type: String, required: true },
  // 站点
  site: { type: String },
  // 角色 admin 管理员 | user 普通用户
  role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
  },
  // 密码
  password: { type: String },
  // 是否被禁言
  mute: { type: Boolean, default: false },
}, { timestamps: true });
