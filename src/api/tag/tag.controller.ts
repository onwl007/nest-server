import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { resFormat, ApiCode, ApiErrorCode } from '../../common';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 获取全部标签
   * @param keyword 关键字
   */
  @Get()
  async findAll(@Query('keyword') keyword?: string): Promise<any> {
    const conditions: any = {};
    if (keyword) {
      conditions.name = { $regex: keyword };
    }
    const tags = await this.tagService.findAll(conditions);
    const data = { total: tags.length, list: tags };
    return resFormat(ApiCode.GET_ALL_TAGS, ApiErrorCode.SUCCESS, '获取全部标签成功', data);
  }

  /**
   * 获取单个标签详情
   * @param id 标签 ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const tag = await this.tagService.findById(id);
    return resFormat(ApiCode.GET_TAG, ApiErrorCode.SUCCESS, '获取标签详情成功', tag);
  }

  /**
   * 创建标签
   * @param entity 标签
   */
  @Post()
  async createOne(@Body() entity: CreateTagDto): Promise<any> {
    const tag = await this.tagService.create(entity);
    return resFormat(ApiCode.POST_TAG, ApiErrorCode.SUCCESS, '创建标签成功', { tagId: tag._id });
  }

  /**
   * 更新标签
   * @param id 标签 ID
   */
  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() entity: CreateTagDto): Promise<any> {
    const tag = await this.tagService.updateById(id, entity);
    return resFormat(ApiCode.PUT_TAG, ApiErrorCode.SUCCESS, '修改标签成功', { tagId: tag._id });
  }

  /**
   * 删除标签
   * @param id 标签 ID
   */
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    const tag = await this.tagService.deleteById(id);
    return resFormat(ApiCode.DELETE_TAG, ApiErrorCode.SUCCESS, '删除标签成功', { tagId: tag._id });
  }
}
