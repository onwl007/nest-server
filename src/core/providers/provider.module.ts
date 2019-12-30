import { Global, Module } from '@nestjs/common';
import { loggerProvider } from './provider';

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class ProviderModule {}
