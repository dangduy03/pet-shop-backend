import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifiedOtpDto {
    @IsNotEmpty()
    @IsString()
    otp: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}