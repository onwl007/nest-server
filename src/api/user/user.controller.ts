import { Controller, Inject, Body, Post } from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from './user.service';
import { resFormat } from '../../common/utils';
import { ApiCode } from '../../common/enums/api-code.enum';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

@Controller('users')
export class UserController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string }): Promise<any> {
      await this.userService.login(body.username, body.password);
      const accessToken = await this.authService.createToken({ username: body.username });
      return resFormat(ApiCode.GET_LOGIN, ApiErrorCode.SUCCESS, '登录成功', accessToken);
  }
}
