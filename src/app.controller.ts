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
