import { Document } from 'mongoose';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class User extends Document {
  username: string;
  password: string;
  gravater: string;
}

export class LoginDto {
  @IsDefined()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @IsDefined()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;
}
