import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'util/guard/jwt.guard';
import { CreateUserDto } from 'src/feature/user/dto/create-user.dto';
import { OtpService } from './otp.service';
import { VerifiedOtpDto } from './dto/verified-otp.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private otpService: OtpService
    ) { }

    @Public()
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @Post('sign-up')
    signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }

    @Public()
    @Post('send-otp')
    sendOtp(@Body() body: any) {
        return this.otpService.sendOtp(body.email);
    }

    @Public()
    @Post('vefified-otp')
    verifiedOtp(@Body() pagram: VerifiedOtpDto) {
        return this.otpService.verifiedOtp(pagram.otp, pagram.email);
    }

    @Public()
    @Post('change-password')
    resetPassword(@Body() body: any) {
        if (!body.email || !body.password) {
            return new BadRequestException("email and password required!");
        }
        const { email, password } = body;
        return this.authService.resetPassword(email, password);
    }
}
