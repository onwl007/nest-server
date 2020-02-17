import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleProvider } from './article.model';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleProvider],
  exports: [ArticleService],
})
export class ArticleModule {}
