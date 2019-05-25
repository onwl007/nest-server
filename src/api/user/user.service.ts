import { Injectable, Inject, OnModuleInit, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { encryptPassword, checkPassword } from '../../common/utils';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiCode } from '../../common/enums/api-code.enum';
import { ApiErrorCode } from '../../common/enums//api-error-code.enum';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    const sds = await this.userModel.findOne({ role: 'admin' });
    if (await this.userModel.findOne({ role: 'admin' })) {
      return;
    }
    // 初始化管理员
    const admin = new this.userModel({
      username: 'onwl007',
      name: 'onwl007',
      email: 'onwl007@126.com',
      avatar: 'https://github.com/onwl007/Markdown-Photos/blob/master/JavaScript-logo.png',
      site: 'www.onwl007.com',
      role: 'admin',
      password: encryptPassword('i am iron man'),
      mute: false,
    });
    await admin.save();
  }

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

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
