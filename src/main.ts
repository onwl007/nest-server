import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiParamsValidationPipe } from './core/pipes/api-params-validation.pipe';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
