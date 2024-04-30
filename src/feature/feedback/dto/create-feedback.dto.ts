import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class CreateFeedbackDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

}