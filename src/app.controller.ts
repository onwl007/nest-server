/*
 * @Desc: 主页控制器
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-04 23:57:04
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:38:21
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
