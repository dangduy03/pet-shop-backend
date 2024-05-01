import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TypeEnum } from "../enum/type.enum";


export class CreateCategoryDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: TypeEnum;

    
}