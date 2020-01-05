/*
 * @Desc: 配置模块
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 00:19:45
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:37:02
 */

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
