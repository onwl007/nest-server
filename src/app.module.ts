/**
 * @file app module
 * @description app 主模块
 * @date 2020-01-04 23:57:44
 * @author onwl007 <https://github.com/onwl007>
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProviderModule } from './shared/provider/provider.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './core/interceptors/logger.interceptors';

@Module({
  imports: [ProviderModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
