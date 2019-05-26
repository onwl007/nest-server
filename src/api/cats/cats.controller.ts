import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiCode } from '../../common/enums/api-code.enum';
import { resFormat } from '../../common/utils';
import { AuthGuard } from '@nestjs/passport';

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
