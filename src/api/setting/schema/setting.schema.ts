/**
 * @description 设置模型
 */

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const SettingSchema = new mongoose.Schema({
  // 站点设置
  site: {
    logo: { type: String },
    welcome: { type: String, default: '' },
    links: [{
      id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      avatar: { type: String, default: '' },
      slogan: { type: String, default: '' },
      site: { type: String, required: true },
    }],
  },
   // 个人信息
   personal: {
    slogan: { type: String, default: '' },
    description: { type: String, default: '' },
    tag: [{ type: String }],
    hobby: [{ type: String }],
    skill: [{ type: String }],
    location: { type: String, default: '' },
    company: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    github: { type: Object, default: {} },
  },
}, { timestamps: true });
