import { Schema, model } from 'mongoose';
import {
  getProviderByModel,
  getModelToken,
} from '../../shared/utils/model.util';

const CommentSchema = new Schema({}, { timestamps: true });
const commentModel = model('Comment', CommentSchema);

export const CommentProvider = getProviderByModel(commentModel);
export const CommentModelToken = getModelToken(commentModel.modelName);
