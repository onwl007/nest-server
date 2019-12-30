import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './shared/database/database.module';
import { ProviderModule } from './core/providers/provider.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './core/interceptors/logger.interceptors';

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
