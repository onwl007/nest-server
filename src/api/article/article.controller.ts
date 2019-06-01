import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ArticleModule } from './article.module';

@ApiUseTags('article')
@Controller('article')
export class ArticleController {
  @ApiOperation({
    title: '获取所有文章',
    description: '获取所有文章',
    operationId: 'findAll',
  })
  @ApiResponse({ status: 200, description: '获取所有文章' })
  @ApiInternalServerErrorResponse({ description: '失败', type: 500 })
  @Get()
  findAll(): string {
    return 'hello world';
  }
}
