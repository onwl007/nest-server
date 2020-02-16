import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async createToken(@Body() body: LoginDto): Promise<string> {
    const { username = '', password = '' } = body;
    return await this.authService.login(username, password);
  }
}
