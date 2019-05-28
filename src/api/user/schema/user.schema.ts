import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  site: { type: String },
  // 角色 admin 管理员 | user 普通用户
  role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
  },
  password: { type: String },
  // 是否被禁言
  mute: { type: Boolean, default: false },
}, { timestamps: true });
