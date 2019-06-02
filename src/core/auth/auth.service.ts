import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../api/user/interfaces/user.interface';
import { UserService } from '../../api/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) { }

    async createToken(payload: { username: string }): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: { username: string }): Promise<User> {
        return await this.userService.findOneByUserName(payload.username, '_id username roles');
    }
}
