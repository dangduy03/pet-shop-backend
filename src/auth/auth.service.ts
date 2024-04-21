import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/feature/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneBy(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { sub: user.userId, username: user.username, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
