/*
 * @Desc: 提供者模块
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-04 23:56:30
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:38:04
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
