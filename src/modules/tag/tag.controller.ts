import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TagService } from './tag.service';
import { Tag } from './tag.dto';
import { HttpProcessor } from '../../core/decorators/http.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @HttpProcessor.handle('获取所有标签')
  public async getTags(): Promise<Tag[]> {
    return await this.tagService.getTags();
  }

  @Post()
  @HttpProcessor.handle('创建标签')
  public async createTag(@Body() tag: Tag): Promise<Tag> {
    return await this.tagService.createTag(tag);
  }

  @Get(':id')
  @HttpProcessor.handle('获取标签详情')
  public async getTag(@Param('id') id: Types.ObjectId): Promise<Tag> {
    return await this.tagService.getTag(id);
  }

  @Put(':id')
  @HttpProcessor.handle('修改标签')
  public async updateTag(
    @Param('id') id: Types.ObjectId,
    @Body() tag: Tag,
  ): Promise<Tag> {
    return await this.tagService.updateTag(id, tag);
  }

  @Delete(':id')
  @HttpProcessor.handle('删除标签')
  public async deleteTag(@Param('id') id: Types.ObjectId): Promise<Tag> {
    return await this.tagService.deleteTag(id);
  }
}
