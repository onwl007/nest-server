/**
 * @file config module
 * @description 配置模块
 * @date 2020-01-05 00:19:45
 * @author onwl007 <https://github.com/onwl007>
 */
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
