import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { EnvConfig } from './config.interface';
import { ConfigToken } from './config.constants';

@Global()
@Module({})
export class ConfigModule {
  static forRoot<T = EnvConfig>(filePath?: string, validator?: (envConfig: T) => T): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(filePath || `${ process.env.NODE_ENV || 'development' }.env`, validator),
        },
        {
          provide: ConfigToken,
          useValue: new ConfigService(filePath || `${ process.env.NODE_ENV || 'development' }.env`, validator),
        },
      ],
      exports: [
        ConfigService,
        ConfigToken,
      ],
    };
  }
}
