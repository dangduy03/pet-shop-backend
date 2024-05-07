import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiQueryParams } from 'util/decorator/api-query-params.decorator';
import AqpDto from 'util/interceptor/aqp/aqp.dto';
import ParseObjectIdPipe from 'util/pipe/parse-object.pipe';
import { Types } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'util/decorator/get-current-user-id.decorator';

@ApiTags("Carts")
@Controller('cart')
export class CartController {
    constructor(readonly cartService: CartService) { }

    @Get('')
    async findAll(
        @ApiQueryParams() { filter, population, ...options }: AqpDto,
    ): Promise<any> {
        return this.cartService.findManyBy(filter, {
            populate: population,
            options,
        });
    }

    @Post('')
    @HttpCode(201)
    async create(@Body() body: CreateCartDto): Promise<any> {
        const result = await this.cartService.create(body);
        return result;
    }

    @Post('add-to-cart')
    @HttpCode(201)
    async addToCart(
        @GetCurrentUserId() userId: string,
        @Body() body: any
    ){
        const result = await this.cartService.addToCart(body.productId,userId, body.quantity);
        return result;
    }

    @Post('decrease-cart')
    @HttpCode(201)
    async desceaseCartQuantity(
        @GetCurrentUserId() userId: string,
        @Body() body: any
    ){
        const result = await this.cartService.desceaseCartQuantity(body.productId,userId);
        return result;
    }


    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: UpdateCartDto,
    ): Promise<any> {
        const result = await this.cartService.updateOneById(id, body);
        return result;
    }

    @Delete(':ids/ids')
    async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
        const result = await this.cartService.deleteManyHardByIds(
            ids.split(',').map((item: any) => new Types.ObjectId(item)),
        );
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    ): Promise<any> {
        const result = await this.cartService.deleteOneHardById(id);
        return result;
    }

    @Get('paginate')
    async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
        return this.cartService.paginate(query);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @ApiQueryParams() { filter, population, projection }: AqpDto,
    ): Promise<any> {
        const result = await this.cartService.findOneById(id, {
            populate: population,
            projection,
        });

        if (!result) throw new NotFoundException('The item does not exist');

        return result;
    }
}
