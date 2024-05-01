import { Module } from '@nestjs/common';
import { UserModule } from 'src/feature/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'util/constant/secrect.constant';
import { OtpService } from './otp.service';
import { MailModule } from 'src/provider/mail/mail.module';

@Module({
    imports: [
        UserModule, JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
        MailModule
    ],
    providers: [AuthService, OtpService],
    controllers: [AuthController],
    exports: [AuthService, OtpService]
})
export class AuthModule { }
