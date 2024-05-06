import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/feature/user/dto/create-user.dto';
import { RoleEnum } from 'src/feature/user/enum/role.enum';
import { UserService } from 'src/feature/user/user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneBy({ username });
        if (await bcrypt.compare(pass, user.password) == false) {
            return new UnauthorizedException("Username or password wrong!")
        }
        const { password, ...result } = user;
        const payload = { _id: user._id , username: user.username, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(user: CreateUserDto): Promise<any> {
        user.role = RoleEnum.USER;
        const users = await this.userService.findOneBy({
            username: user.username
        });
        if (users) return new ConflictException("Account exits");
        else {
            const result = await this.userService.create(user);
            return result;
        }
    }

    async resetPassword(email: string, password : string):Promise<any> {
        const user = await this.userService.findOneBy({
            email,
        });
        if(!user) {
            throw new UnauthorizedException();
        }

        user.password = password;
        const id = user._id;
        delete user._id;

        const result = await this.userService.updateOneById(id,user);

        return result;
    }
}
