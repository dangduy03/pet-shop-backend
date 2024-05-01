import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import Redis from "ioredis";
import { Types } from "mongoose";
import * as Ramdomstring from 'randomstring';
import { UserService } from "src/feature/user/user.service";
import { MailService } from "src/provider/mail/mail.service";
@Injectable()
export class OtpService {
    constructor(
        private userService: UserService,
        private mailService: MailService,
        @InjectRedis() private readonly redis: Redis
    ) { }

    async sendOtp(
        email: any,
    ) {
        const checkOtp = await this.redis.get(email);
        if (checkOtp) {
            await this.redis.del(email);
        }
        const otp = Ramdomstring.generate(10);
        const result = await this.redis.set(email, otp, 'EX', 10);
        await this.sendOtpEmail(email,otp);
        return {
            message: "OTP send successfull",
            code: 200
        };
    }

    async verifiedOtp(
        otp: string,
        email: string
    ) {
        const checkOtp = await this.redis.get(email);
        if (checkOtp && checkOtp == otp) {
            return {
                message: "verified OTP successfull",
                code: 200
            };
        } else {
            return new ConflictException("OTP not valid");
        }
    }

    async sendOtpEmail(email: string, otpCode: string) {
        try {
            await this.mailService.sendMail(
                [
                    {
                        name:'',
                        address: email,
                    }
                ],
                'PetShop Otp Auth',
                undefined,
                undefined,
                {
                    VERIFICATION_CODE: otpCode
                },
                "otpTemplate"
            );

        } catch (e) {
            console.log(e);
            throw new NotFoundException("Failed  to send OTP. Please try again");
        }
    }
}

