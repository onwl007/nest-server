import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { loggerProvider } from './logger.provider';

@Global()
@Module({
  providers: [databaseProvider, loggerProvider],
  exports: [databaseProvider, loggerProvider],
})
export class ProviderModule {}
