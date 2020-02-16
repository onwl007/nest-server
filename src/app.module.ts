import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProviderModule } from './shared/provider/provider.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './core/interceptors/logger.interceptors';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { HelperModule } from './shared/helper/helper.module';
import { CorsMiddleware } from './core/middlewares/cors.middleware';
import { OriginMiddleware } from './core/middlewares/origin.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProviderModule, ConfigModule, HelperModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  static port: number;
  constructor(private readonly config: ConfigService) {
    AppModule.port = Number(this.config.get('PORT'));
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
