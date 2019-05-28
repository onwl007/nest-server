import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConfig } from '../../config';
import { UserModule } from '../../api/user/user.module';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
    imports: [
        // PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({    // 向 nest 容器注册 jwt 模块，并配置密钥和令牌有效期
            secretOrPrivateKey: ApplicationConfig.jwtOptions.secretOrPrivateKey,
            signOptions: ApplicationConfig.jwtOptions.signOptions,
        }),
        forwardRef(() => UserModule),   // 处理模块间的循环依赖
    ],
    providers: [AuthService, AuthStrategy],
    exports: [AuthService],  // 导出 AuthServie 供 UserModule 使用
})
export class AuthModule {}
