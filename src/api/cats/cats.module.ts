import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CatsService } from './cats.service';
import { DatabaseModule } from '../../shared/database/database.module';
import { CatsController } from './cats.controller';
import { catsProviders } from './cats.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}
