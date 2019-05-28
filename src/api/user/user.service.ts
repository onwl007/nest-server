import { Injectable, OnModuleInit, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { checkPassword } from '../../common/utils';
import { ApiException } from '../../core/exceptions';
import { ApiErrorCode, ApiCode } from '../../common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationConfig } from '../../config';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    if (await this.userModel.findOne({ role: 'admin' })) {
      return;
    }
    // 初始化管理员
    const admin = new this.userModel(ApplicationConfig.initAdmin);
    await admin.save();
  }

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * 通过用户名查询用户
   * @param username 用户名
   */
  async findOneByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  /**
   * 用户登录
   *
   * @param account 登录账号
   * @param password 登录密码
   */
  async login(username: string, password: string): Promise<void> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    if (!user) {
      throw new ApiException(ApiCode.GET_LOGIN, ApiErrorCode.GET_LOGIN_ERR , '登录账号有误', HttpStatus.BAD_REQUEST);
    }
    if (!checkPassword(password, user.password)) {
      throw new ApiException(ApiCode.GET_LOGIN, ApiErrorCode.GET_LOGIN_ERR , '登录密码有误', HttpStatus.BAD_REQUEST);
    }
  }
}
