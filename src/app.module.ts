/*
 * @Desc: app 主模块
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-04 23:57:44
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:38:55
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProviderModule } from './shared/provider/provider.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './core/interceptors/logger.interceptors';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { HelperModule } from './shared/helper/helper.module';

@Module({
  imports: [ProviderModule, ConfigModule, HelperModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly config: ConfigService) {
    AppModule.port = Number(this.config.get('PORT'));
  }
}
