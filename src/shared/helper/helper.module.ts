import { Module, Global, HttpModule } from '@nestjs/common';
import { EmailService } from './help.service.email';
import { AkismetService } from './helper.service.akismet';
import { IpService } from './help.service.ip';

@Global()
@Module({
  imports: [HttpModule],
  providers: [EmailService, AkismetService, IpService],
  exports: [EmailService, AkismetService, IpService],
})
export class HelperModule {}
