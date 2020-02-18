import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryProvider } from './category.model';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryProvider],
  exports: [CategoryService],
})
export class CategoryModule {}
