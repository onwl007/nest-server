/*
 * @Desc: 辅助模块
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-10 09:15:27
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-10 09:16:20
 */

import { Module, Global } from '@nestjs/common';
import { EmailService } from './help.service.email';

@Global()
@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class HelperModule {}
