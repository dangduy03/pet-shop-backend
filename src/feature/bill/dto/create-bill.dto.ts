import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { StatusBillEnum } from "../enum/status-bill.enum";
import { PayMethodEnum } from "../enum/pay-method.enum";


export class CreateBillDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: StatusBillEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    payMethod: PayMethodEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    totalPrice: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    products: {
        productId: string,
        quantity: number,
    }[];
}