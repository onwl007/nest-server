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
  await app.listen(3000, () => {
    console.log(`Nest-server run port at ${3000}`);
  });
}
bootstrap();
