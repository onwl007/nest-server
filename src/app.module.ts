import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './api/cats/cats.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [CatsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
