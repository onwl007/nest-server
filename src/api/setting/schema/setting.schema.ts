/**
 * @description 设置模型
 */

import * as mongoose from 'mongoose';

export const SettingSchema = new mongoose.Schema({
  // 站点设置
  site: {
    logo: { type: String },
    welcome: { type: String, default: '' },
    links: [{
      id: { type: mongoose.Types.ObjectId, required: true },
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
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    github: { type: Object, default: {} },
},
}, { timestamps: true });
