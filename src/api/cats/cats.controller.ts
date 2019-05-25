import { Controller, Post, Body, Get, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { resFormat } from '../../common/utils';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
    return resFormat(ApiErrorCode.SUCCESS, '新增猫成功', null);
  }

  @Get()
  async findAll(): Promise<any> {
    const data = await this.catService.findAll();
    return resFormat(ApiErrorCode.SUCCESS, '获取全部猫成功', data);
  }
}
