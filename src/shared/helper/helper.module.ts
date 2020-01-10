import { Module, Global } from '@nestjs/common';
import { EmailService } from './help.service.email';
import { AkismetService } from './helper.service.akismet';

@Global()
@Module({
  imports: [],
  providers: [EmailService, AkismetService],
  exports: [EmailService, AkismetService],
})
export class HelperModule {}
