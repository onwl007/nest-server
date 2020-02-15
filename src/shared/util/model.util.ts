import { Provider } from '@nestjs/common';
import { Connection, Model, Document } from 'mongoose';
import {
  DB_CONNECTION_TOKEN,
  DB_MODEL_TOKEN_SUFFIX,
} from '../../core/constants/system.constants';

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX;
}

export function getProviderByModel<T extends Document>(
  model: Model<T>,
): Provider {
  return {
    provide: getModelToken(model.modelName),
    useFactory: (connection: Connection) => model,
    inject: [DB_CONNECTION_TOKEN],
  };
}
