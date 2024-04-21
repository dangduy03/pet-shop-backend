import { Module } from '@nestjs/common';
import { UserModule } from 'src/feature/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'util/constant/secrect.constant';

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '7d' },
    }),],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
