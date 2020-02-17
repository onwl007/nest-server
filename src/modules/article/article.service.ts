import { Injectable, Inject } from '@nestjs/common';
import { ArticleModelToken } from './article.model';
import { PaginateResult, PaginateModel, Types } from 'mongoose';
import { Article } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleModelToken)
    private readonly articleModel: PaginateModel<Article>,
  ) {}

  public async getArticles(): Promise<PaginateResult<Article>> {
    return await this.articleModel.paginate();
  }

  public async createArticle(article: Article): Promise<Article> {
    return await this.articleModel.create(article);
  }

  public async getArticle(id: Types.ObjectId): Promise<Article> {
    return await this.articleModel
      .findById(id)
      .lean()
      .exec();
  }

  public async updateArticle(
    id: Types.ObjectId,
    article: Article,
  ): Promise<Article> {
    return await this.articleModel
      .findByIdAndUpdate(id, article)
      .lean()
      .exec();
  }

  public async deleteArticle(id: Types.ObjectId): Promise<Article> {
    return await this.articleModel
      .findByIdAndRemove(id)
      .lean()
      .exec();
  }
}
