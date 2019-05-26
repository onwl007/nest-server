import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CatsModule,
    UserModule,
  ],
})
export class ApiModule {}
