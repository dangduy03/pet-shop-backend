import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "../enum/gender.enum";
import { StatusEnum } from "../enum/status.enum";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    categoryId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    age: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: GenderEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsString()
    status: StatusEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    origin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    images: string[];
}