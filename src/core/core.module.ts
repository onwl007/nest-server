import { Module } from '@nestjs/common';
import { ConfigModule, EnvConfig, ConfigService, ConfigValidate } from '../config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot<EnvConfig>(null, ConfigValidate.validateInput),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
