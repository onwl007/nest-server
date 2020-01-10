/*
 * @Desc: 数据库连接提供者
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-04 23:55:30
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:37:24
 */

import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Logger } from 'winston';
import {
  DB_CONNECTION_TOKEN,
  WINSTON_LOGGER_TOKEN,
} from '../../core/constants/system.constants';
import { ConfigService } from '../config/config.service';
import { EmailService } from '../helper/help.service.email';
import { isDevMode } from '../../app.environment';

export const databaseProvider = {
  inject: [WINSTON_LOGGER_TOKEN, ConfigService, EmailService],
  provide: DB_CONNECTION_TOKEN,
  useFactory: async (
    logger: Logger,
    config: ConfigService,
    emailService: EmailService,
  ) => {
    const RECONNET_INTERVAL = 6000;
    // 发送警告邮件 18秒节流
    const sendAlarmMail = _.throttle((error: string) => {
      emailService.sendMail({
        to: config.get('EMAIL_ACCOUNT'),
        subject: `nest-server 数据库发生异常`,
        text: error,
        html: `<pre><code>${error}</code></pre>`,
      });
    }, RECONNET_INTERVAL * 3);

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
      if (!isDevMode) {
        sendAlarmMail(String(error));
      }
    });

    return await connection();
  },
};
