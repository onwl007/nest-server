/**
 * @file provider module
 * @description 提供者模块
 * @date 2020-01-04 23:56:30
 * @author onwl007 <https://github.com/onwl007>
 */
import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { loggerProvider } from './logger.provider';

@Global()
@Module({
  providers: [databaseProvider, loggerProvider],
  exports: [databaseProvider, loggerProvider],
})
export class ProviderModule {}
