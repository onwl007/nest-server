/**
 * @description 标签模型
 */

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TagSchema = new mongoose.Schema({
  // 名称
  name: { type: String, required: true },
  // 描述
  description: { type: String, default: '' },
}, { timestamps: true });
