import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { resFormat, ApiCode, ApiErrorCode } from '../../common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
    return resFormat(ApiCode.POST_CAT, ApiErrorCode.SUCCESS, '新增猫成功', null);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<any> {
    const data = await this.catService.findAll();
    return resFormat(ApiCode.GET_ALL_CATS, ApiErrorCode.SUCCESS, '获取全部猫成功', data);
  }
}
