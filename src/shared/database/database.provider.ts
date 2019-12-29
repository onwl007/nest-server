import * as mongoose from 'mongoose';
import { DB_CONNECTION_TOKEN } from '../../core/constants/system.constants';

export const databaseProvider = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      const RECONNET_INTERVAL = 6000;

      const connection = () => {
        return mongoose.connect('mongodb://localhost:27017/blog', {
          useNewUrlParser: true,
          useCreateIndex: true,
          poolSize: 20,
          autoReconnect: true,
          reconnectInterval: RECONNET_INTERVAL,
          reconnectTries: Number.MAX_SAFE_INTEGER,
        });
      };

      mongoose.connection.on('connecting', () => {
        console.log('数据库连接中...');
      });

      mongoose.connection.on('open', () => {
        console.info('数据库连接成功！');
      });

      mongoose.connection.on('disconnected', () => {
        console.error(
          `数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`,
        );
        setTimeout(connection, RECONNET_INTERVAL);
      });

      mongoose.connection.on('error', error => {
        console.error('数据库发生异常！', error);
        mongoose.disconnect();
      });

      return await connection();
    },
  },
];
