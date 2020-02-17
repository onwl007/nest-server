import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth as AuthConfig } from '../../app.config';
import { UserProvider } from './user.model';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: AuthConfig.jwtTokenSecret as string,
      signOptions: {
        expiresIn: AuthConfig.expiresIn as number,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserProvider, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
