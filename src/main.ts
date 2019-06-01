import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiParamsValidationPipe } from './core/pipes';
import { HttpExceptionFilter } from './core/filters';
import { ConfigService } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService<any> = app.get(ConfigService);
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('PORT'), () => {
    Logger.log(`Starting Nest.js Application on ${ config.get('PORT') } port...`);
  });
}
bootstrap();
