import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interface/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}

  /**
   * 获取全部分类
   * @param query 查询条件，为空时查询全部
   */
  async findAll(query: object): Promise<Category[]> {
    return await this.categoryModel.find(query).lean().exec();
  }

  /**
   * 根据 ID 获取分类
   * @param id Category ObjectId
   */
  async findById(id: string): Promise<Category> {
    return await this.categoryModel.findById(id).lean().exec();
  }

  /**
   * 创建分类
   * @param entity 分类
   */
  async create(entity: CreateCategoryDto): Promise<Category> {
    const createCategory = new this.categoryModel(entity);
    return await createCategory.save();
  }

  /**
   * 更新分类
   * @param id ObjectId
   * @param entity 分类
   */
  async updateById(id: string, entity: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, entity).lean().exec();
  }

  /**
   * 删除分类
   * @param id ObjectId
   */
  async deleteById(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id).lean().exec();
  }
}
