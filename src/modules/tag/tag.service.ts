import { Injectable, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Tag } from './tag.dto';
import { TagModelToken } from './tag.model';

@Injectable()
export class TagService {
  constructor(@Inject(TagModelToken) private readonly tagModel: Model<Tag>) {}

  /**
   * 查询所有 tag
   * @returns Tag[]
   */
  public async getTags(): Promise<Tag[]> {
    return await this.tagModel
      .find()
      .lean()
      .exec();
  }

  /**
   * 创建 tag
   * @param tag Tag
   * @returns Tag
   */
  public async createTag(tag: Tag): Promise<Tag> {
    return await this.tagModel.create(tag);
  }

  /**
   * 获取 tag 详情
   * @param id Tag 主键
   * @returns Tag
   */
  public async getTag(id: Types.ObjectId): Promise<Tag> {
    return await this.tagModel
      .findById(id)
      .lean()
      .exec();
  }

  /**
   * 修改 Tag
   * @param id Tag 主键
   * @param tag Tag
   * @returns Tag
   */
  public async updateTag(id: Types.ObjectId, tag: Tag): Promise<Tag> {
    return await this.tagModel
      .findByIdAndUpdate(id, tag)
      .lean()
      .exec();
  }

  /**
   * 删除 Tag
   * @param id Tag 主键
   * @returns Tag
   */
  public async deleteTag(id: Types.ObjectId): Promise<Tag> {
    return await this.tagModel
      .findByIdAndRemove(id)
      .lean()
      .exec();
  }
}
