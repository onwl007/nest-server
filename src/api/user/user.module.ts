
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../shared/database/database.module';
import { usersProviders } from './user.provider';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
    imports: [
        // 向用户模块注册 passport，并配置默认策略为 jwt，因为覆盖了默认的策略，所以要在每个使用 @AuthGuard() 的模块导入 PassportModule
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule), // 处理模块之间的循环依赖
        DatabaseModule,
    ],
    providers: [UserService, ...usersProviders],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
