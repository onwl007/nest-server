import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './schema/cats.schema';
import { ApplicationConfig } from '../../config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: ApplicationConfig.defaultStrategy }),
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
