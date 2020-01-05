/*
 * @Desc: 参数验证器
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 16:30:32
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:39:55
 */

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/**
 * @class ValidationPipe
 * @classdesc 参数验证
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      const errorMessage = errors
        .map(error => Object.values(error.constraints).join(';'))
        .join(';');
      throw new BadRequestException(errorMessage);
    }
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
