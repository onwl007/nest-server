import { Module, Global } from '@nestjs/common';
import { EmailService } from './help.service.email';

@Global()
@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class HelperModule {}
