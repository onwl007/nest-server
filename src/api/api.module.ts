import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { SettingModule } from './setting/setting.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    CommentModule,
    SettingModule,
    TagModule,
    CatsModule,
    UserModule,
  ],
})
export class ApiModule {}
