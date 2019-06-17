import { Controller, Post, Body, Get, UseGuards, Res, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { resFormat, ApiCode, ApiErrorCode } from '../../common';
import { Cat } from './interfaces/cat.interface';
import { Response, Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() entity: CreateCatDto) {
    this.catService.create(entity);
    return resFormat(ApiCode.POST_CAT, ApiErrorCode.SUCCESS, '新增猫成功', null);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<any> {
    const data = await this.catService.findAll();
    return resFormat(ApiCode.GET_ALL_CATS, ApiErrorCode.SUCCESS, '获取全部猫成功', data);
  }

  @Get('head')
  async testHeaders(@Res() res: Response, @Req() req: Request): Promise<any> {
    const data = await this.catService.findAll();
    res.setHeader('location', req.url + data[0]._id);
    res.json(data);
  }
}
