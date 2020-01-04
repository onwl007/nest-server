/**
 * @file app controller
 * @description 主页控制器
 * @date 2020-01-04 23:57:04
 * @author onwl007 <https://github.com/onwl007>
 */
import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): any {
    return {
      name: 'nest-server',
      version: '1.0.0',
      author: 'onwl007',
      github: 'https://github.com/onwl007',
      powered: [
        'Vue',
        'Nuxt.js',
        'nestjs',
        'Nodejs',
        'MongoDB',
        'Express',
        'Nginx',
        'Redis',
      ],
    };
  }
}
