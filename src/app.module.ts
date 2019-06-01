import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from './config';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { CurrentUserMiddleware } from './core/middleware';

@Module({
  imports: [
    ApiModule,
    ConfigModule,
    CoreModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
