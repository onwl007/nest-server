/*
 * @Desc: 数据库连接提供者
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-04 23:55:30
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:37:24
 */

import * as mongoose from 'mongoose';
import { Logger } from 'winston';
import {
  DB_CONNECTION_TOKEN,
  WINSTON_LOGGER_TOKEN,
} from '../../core/constants/system.constants';
import { ConfigService } from '../config/config.service';

export const databaseProvider = {
  inject: [WINSTON_LOGGER_TOKEN, ConfigService],
  provide: DB_CONNECTION_TOKEN,
  useFactory: async (logger: Logger, config: ConfigService) => {
    const RECONNET_INTERVAL = 6000;
    const { uri, username, password } = config.getMongoConfig();

    const connection = () => {
      return mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        poolSize: 20,
        autoReconnect: true,
        reconnectInterval: RECONNET_INTERVAL,
        reconnectTries: Number.MAX_SAFE_INTEGER,
      });
    };

    mongoose.connection.on('connecting', () => {
      logger.info('数据库连接中...');
    });

    mongoose.connection.on('open', () => {
      logger.info('数据库连接成功！');
    });

    mongoose.connection.on('disconnected', () => {
      logger.error(`数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`);
      setTimeout(connection, RECONNET_INTERVAL);
    });

    mongoose.connection.on('error', error => {
      logger.error('数据库发生异常！', error);
      mongoose.disconnect();
    });

    return await connection();
  },
};
