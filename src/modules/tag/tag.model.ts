import { Schema, model } from 'mongoose';
import {
  getProviderByModel,
  getModelToken,
} from '../../shared/utils/model.util';

const TagSchema = new Schema(
  {
    // 名称
    name: {
      type: String,
      required: true,
      validate: /\S+/,
    },
    // 描述
    description: {
      type: String,
      default: '',
    },
    // 数量
    count: {
      type: Number,
      default: '',
    },
  },
  { timestamps: true },
);
const tagModel = model('tag', TagSchema);

export const TagProvider = getProviderByModel(tagModel);
export const TagModelToken = getModelToken(tagModel.modelName);
