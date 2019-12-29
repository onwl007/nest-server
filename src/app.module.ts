import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
