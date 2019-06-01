import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiParamsValidationPipe } from './core/pipes';
import { HttpExceptionFilter } from './core/filters';
import { ConfigService } from './config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService<any> = app.get(ConfigService);
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Nest-Server API')
    .setDescription('The Nest-Server API description')
    .setVersion('1.0.0')
    .addTag('Nest-Server', '博客服务接口')
    .build();
  const serverDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, serverDocument);

  await app.listen(config.get('PORT'), () => {
    Logger.log(`Starting Nest.js Application on ${ config.get('PORT') } port...`);
  });
}
bootstrap();
