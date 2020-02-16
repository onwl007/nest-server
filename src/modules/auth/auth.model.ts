import { Schema, model } from 'mongoose';
import {
  getProviderByModel,
  getModelToken,
} from '../../shared/utils/model.util';

const UserSchema = new Schema({
  username: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  gravatar: {
    type: String,
    default: '',
  },
});

const userModel = model('User', UserSchema);
export const UserProvider = getProviderByModel(userModel);
export const UserModelToken = getModelToken(userModel.modelName);
