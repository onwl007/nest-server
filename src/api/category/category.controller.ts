import { Controller, Get, Inject, Query, UsePipes, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { resFormat, ApiCode, ApiErrorCode } from '../../common';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  /**
   * 获取全部分类
   * 当 keyword 不为空时，模糊搜索分类
   * @param keyword 关键词
   */
  @Get()
  async findAll(@Query('keyword') keyword: string): Promise<any> {
    const query: any = {};
    if (keyword) {
      query.name = { $regex: keyword };
    }
    const categories = await this.categoryService.findAll(query);
    const data = { total: categories.length, list: categories };
    return resFormat(ApiCode.GET_ALL_CATEGORIES, ApiErrorCode.SUCCESS, '获取全部分类成功', data);
  }

  /**
   * 创建分类
   * @param entity 分类
   */
  @Post()
  async createOne(@Body() entity: CreateCategoryDto): Promise<any> {
    this.categoryService.create(entity);
    return resFormat(ApiCode.POST_CATEGORY, ApiErrorCode.SUCCESS, '创建分类成功', null);
  }

  /**
   * 获取分类详情
   * @param id 分类 ObjectId
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const category = await this.categoryService.findById(id);
    return resFormat(ApiCode.GET_CATEGORY_BY_ID, ApiErrorCode.SUCCESS, '获取分类详情成功', category);
  }

  /**
   * 更新分类
   * @param id ObjectId
   * @param entity 分类
   */
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() entity: CreateCategoryDto): Promise<any> {
    const category = await this.categoryService.updateById(id, entity);
    return resFormat(ApiCode.PUT_CATEGORY, ApiErrorCode.SUCCESS, '更新分类成功', { categoryId: category._id });
  }

  /**
   * 删除分类
   * @param id ObjectId
   */
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<any> {
    const category = await this.categoryService.deleteById(id);
    return resFormat(ApiCode.DELETE_CATEGORY, ApiErrorCode.SUCCESS, '删除分类成功', { categoryId: category._id });
  }
}
