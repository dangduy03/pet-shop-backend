import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateFeedbackDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}