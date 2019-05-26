import * as mongoose from 'mongoose';
import { ConfigService } from '../../config/config.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://127.0.0.1:27017/blog'),
  },
];
