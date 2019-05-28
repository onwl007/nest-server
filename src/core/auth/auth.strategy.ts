import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ApplicationConfig } from '../../config';
@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ApplicationConfig.jwtOptions.secretOrKey,
    });
  }

  async validate(payload: { username: string }) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('没有权限');
    }
    return user;
  }
}
