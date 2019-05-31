import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../../core/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationConfig } from '../../config';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { SettingSchema } from './schema/setting.schema';

@Module({
  imports: [
    // 向用户模块注册 passport，并配置默认策略为 jwt，因为覆盖了默认的策略，所以要在每个使用 @AuthGuard() 的模块导入 PassportModule
    PassportModule.register({ defaultStrategy: ApplicationConfig.defaultStrategy }),
    forwardRef(() => AuthModule), // 处理模块之间的循环依赖
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
  ],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule {}
