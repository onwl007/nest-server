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
