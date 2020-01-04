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
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
Object.assign(global.console, {
  log: (...args) => log('[log]', '[nest-server]', ...args),
  warn: (...args) => warn('\x1b[33m%s', '[warn]', '[nest-server]', ...args),
  info: (...args) => info('\x1b[34m%s', '[info]', '[nest-server]', ...args),
  error: (...args) => info('\x1b[31m%s', '[error]', '[nest-server]', ...args),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  await app.listen(3000, () => {
    console.log(`Nest-server run port at ${3000}`);
  });
}
bootstrap();
