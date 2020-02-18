import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PaginateResult, Types } from 'mongoose';
import { ArticleService } from './article.service';
import { Article } from './article.dto';
import { HttpProcessor } from '../../core/decorators/http.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpProcessor.paginate()
  @HttpProcessor.handle('获取文章列表')
  public async getArticles(): Promise<PaginateResult<Article>> {
    return await this.articleService.getArticles();
  }

  @Post()
  @HttpProcessor.handle('添加文章')
  public async createArticle(@Body() article: Article): Promise<Article> {
    return await this.articleService.createArticle(article);
  }

  @Get(':id')
  @HttpProcessor.handle('获取文章详情')
  public async getArticle(@Param('id') id: Types.ObjectId): Promise<Article> {
    return await this.articleService.getArticle(id);
  }

  @Put(':id')
  @HttpProcessor.handle('修改文章')
  public async updateArticle(
    @Param('id') id: Types.ObjectId,
    @Body() article: Article,
  ): Promise<Article> {
    return await this.articleService.updateArticle(id, article);
  }

  @Delete(':id')
  @HttpProcessor.handle('删除文章')
  public async deleteArticle(
    @Param('id') id: Types.ObjectId,
  ): Promise<Article> {
    return await this.articleService.deleteArticle(id);
  }
}
