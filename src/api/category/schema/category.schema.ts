/**
 * @description 分类模型
 */

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CategorySchema = new mongoose.Schema({
  // 分类
  name: { type: String, required: true },
  // 描述
  description: { type: String },
}, { timestamps: true });
