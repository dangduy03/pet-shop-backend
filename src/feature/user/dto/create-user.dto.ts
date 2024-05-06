import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { HabbitEnum } from "../enum/habbit.enum";
import { RoleEnum } from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    role: RoleEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    habbit: HabbitEnum[];

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    address: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar: string;
}