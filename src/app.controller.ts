import { Get, Controller } from '@nestjs/common';
import { INFO } from './app.config';

@Controller()
export class AppController {
  @Get()
  root(): any {
    return INFO;
  }
}
