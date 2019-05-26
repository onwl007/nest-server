import * as mongoose from 'mongoose';
import { ConfigService } from '../../config/config.service';
import { ConfigValidate } from '../../config/config.validate';
const config = new ConfigService(`env/${ process.env.NODE_ENV }.env`, ConfigValidate.validateInput);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(config.get('MONGODB_URI')),
  },
];
