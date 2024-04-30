import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateCartDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;


    @ApiProperty({required: false})
    @IsOptional()
    @IsArray()
    products: {
        productId: string,
        quantity: number,
    }[];

}