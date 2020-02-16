import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModelToken } from './auth.model';
import { Model } from 'mongoose';
import { User } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserModelToken) private readonly userModel: Model<User>,
  ) {}

  private signToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  public async validateUser(username: string): Promise<any> {
    const user = await this.userModel
      .findOne({ username })
      .lean()
      .exec();
    return user ? user : null;
  }

  public async login(username: string, password: string): Promise<string> {
    const { _id: userId, password: extantPassword = '' } = await this.userModel
      .findOne({ username })
      .lean()
      .exec();
    const loginPassword = password;
    if (loginPassword !== extantPassword) {
      throw new UnauthorizedException('密码不匹配');
    }
    return this.signToken({ userId, username });
  }
}
