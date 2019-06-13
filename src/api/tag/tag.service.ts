import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './interface/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private readonly tagModel: Model<Tag>
  ) {}

  /**
   * 查询标签
   * @param conditions 查询条件
   */
  async findAll(conditions: object): Promise<Tag[]> {
    return await this.tagModel.find(conditions).lean().exec();
  }

  async findById(id: string): Promise<Tag> {
    return await this.tagModel.findById(id).lean().exec();
  }

  /**
   * 创建标签
   * @param entity 标签
   */
  async create(entity: CreateTagDto): Promise<Tag> {
    const createTag = new this.tagModel(entity);
    return await createTag.save();
  }

  /**
   * 更新标签
   * @param id 标签 ID
   * @param entity 标签
   */
  async updateById(id: string, entity: CreateTagDto): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, entity).lean().exec();
  }

  /**
   * 标签
   * @param id 标签 ID
   */
  async deleteById(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndRemove(id).lean().exec();
  }
}
