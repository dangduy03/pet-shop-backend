import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { ConflictException, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { Types } from "mongoose";
import * as Ramdomstring from 'randomstring';
import { UserService } from "src/feature/user/user.service";
@Injectable()
export class OtpService {
    constructor(
        private userService: UserService,


        @InjectRedis() private readonly redis: Redis
    ) { }

    async sendOtp(
        email: any,
    ) {
        const result = await this.redis.set(email, Ramdomstring.generate(10), 'EX', 10);
        return {
            message: "OTP send successfull",
            code: 200
        };
    }

    async verifiedOtp(
        otp: string,
        userId: string,

    ) {
        const user = await this.userService.findOneById(new Types.ObjectId(userId));
        const checkOtp = await this.redis.get(userId);
        if (checkOtp && checkOtp == otp) {
            return {
                message: "verified OTP successfull",
                code: 200
            };
        } else {
            return new ConflictException("OTP not valid");
        }
    }
}

