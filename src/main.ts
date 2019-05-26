import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiParamsValidationPipe } from './core/pipes/api-params-validation.pipe';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ConfigService } from './config/config.service';
import { ConfigValidate } from './config/config.validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService(`env/${ process.env.NODE_ENV }.env`, ConfigValidate.validateInput);
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.get('PORT'));
}
bootstrap();
