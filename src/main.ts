/**
 * @file app entry
 * @description 入口文件
 * @date 2020-01-04 23:59:21
 * @author onwl007 <https://github.com/onwl007>
 */
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './app.environment';
import { HttpExceptionFilter } from './core/filters/exception.filter';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
Object.assign(global.console, {
  log: (...args) =>
    log(
      '\x1b[32m%s',
      '[nest-server]',
      `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      '[LOG]',
      ...args,
    ), // 绿色
  warn: (...args) =>
    warn(
      '\x1b[33m%s',
      '[nest-server]',
      `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      '[WARN]',
      ...args,
    ), // 黄色
  info: (...args) =>
    info(
      '\x1b[34m%s',
      '[nest-server]',
      `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      '[INFO]',
      ...args,
    ), // 蓝色
  error: (...args) =>
    info(
      '\x1b[31m%s',
      '[nest-server]',
      `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      '[ERROR]',
      ...args,
    ), // 红色
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppModule.port, () => {
    console.log(
      `Nest server started on port ${AppModule.port} with env: ${environment}`,
    );
  });
}
bootstrap();
