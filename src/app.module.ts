import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ApiModule } from './api/api.module';
import { CurrentUserMiddleware } from './core/middleware/current-user.middleware';
import { EnvConfig } from './config/config.interface';
import { ConfigValidate } from './config/config.validate';

@Module({
  imports: [
    ApiModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
