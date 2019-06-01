import { Controller, Get } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  @Get()
  findAll(): string {
    return 'hello world';
  }
}
