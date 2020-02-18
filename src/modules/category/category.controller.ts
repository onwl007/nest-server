import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.dto';
import { Types } from 'mongoose';
import { HttpProcessor } from 'src/core/decorators/http.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpProcessor.handle('获取全部分类')
  public async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Post()
  @HttpProcessor.handle('创建分类')
  public async createCategory(@Body() category: Category): Promise<Category> {
    return await this.categoryService.createCategory(category);
  }

  @Get(':id')
  @HttpProcessor.handle('获取分类详情')
  public async getCategory(@Param('id') id: Types.ObjectId): Promise<Category> {
    return await this.categoryService.getCategory(id);
  }

  @Put(':id')
  @HttpProcessor.handle('修改分类')
  public async updateCategory(
    @Param('id') id: Types.ObjectId,
    @Body() category: Category,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  @HttpProcessor.handle('删除分类')
  public async deleteCategory(
    @Param('id') id: Types.ObjectId,
  ): Promise<Category> {
    return await this.categoryService.deleteCategory(id);
  }
}
