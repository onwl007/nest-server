import { Injectable } from '@nestjs/common';
import { Category } from './category.dto';
import { Types, Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryModel: Model<Category>) {}

  /**
   * 获取全部分类
   * @returns Category[]
   */
  public async getCategories(): Promise<Category[]> {
    return await this.categoryModel
      .find()
      .lean()
      .exec();
  }

  /**
   * 创建分类
   * @param category 分类
   * @returns Category
   */
  public async createCategory(category: Category): Promise<Category> {
    return await this.categoryModel.create(category);
  }

  /**
   * 获取分类详情
   * @param id 分类主键
   * @returns Category
   */
  public async getCategory(id: Types.ObjectId): Promise<Category> {
    return await this.categoryModel
      .findById(id)
      .lean()
      .exec();
  }

  /**
   * 修改分类
   * @param id 分类主键
   * @param category 分类实体
   * @returns Category
   */
  public async updateCategory(
    id: Types.ObjectId,
    category: Category,
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category);
  }

  /**
   * 删除分类
   * @param id 分类主键
   * @returns Category
   */
  public async deleteCategory(id: Types.ObjectId): Promise<Category> {
    return await this.categoryModel
      .findByIdAndRemove(id)
      .lean()
      .exec();
  }
}
