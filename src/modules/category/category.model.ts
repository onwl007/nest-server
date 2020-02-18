import { Schema, model } from 'mongoose';
import {
  getProviderByModel,
  getModelToken,
} from '../../shared/utils/model.util';

const CategorySchema = new Schema(
  {
    // 分类名称
    name: {
      type: String,
      required: true,
      validate: /\S+/,
    },
    // 简介
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);
const categoryModel = model('Category', CategorySchema);

export const CategoryProvider = getProviderByModel(categoryModel);
export const CategoryModelToken = getModelToken(categoryModel.modelName);
