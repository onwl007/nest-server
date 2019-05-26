import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
