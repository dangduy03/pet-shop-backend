import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiQueryParams } from 'util/decorator/api-query-params.decorator';
import AqpDto from 'util/interceptor/aqp/aqp.dto';
import ParseObjectIdPipe from 'util/pipe/parse-object.pipe';
import { Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(readonly productService: ProductService) { }

    @Get('')
    async findAll(
        @ApiQueryParams() { filter, population, ...options }: AqpDto,
    ): Promise<any> {
        return this.productService.findManyBy(filter, {
            populate: population,
            options,
        });
    }

    @Post('')
    @HttpCode(201)
    async create(@Body() body: CreateProductDto): Promise<any> {
        const result = await this.productService.create(body);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: UpdateProductDto,
    ): Promise<any> {
        const result = await this.productService.updateOneById(id, body);
        return result;
    }

    @Delete(':ids/ids')
    async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
        const result = await this.productService.deleteManyHardByIds(
            ids.split(',').map((item: any) => new Types.ObjectId(item)),
        );
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    ): Promise<any> {
        const result = await this.productService.deleteOneHardById(id);
        return result;
    }

    @Get('paginate')
    async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
        return this.productService.paginate(query);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @ApiQueryParams() { filter, population, projection }: AqpDto,
    ): Promise<any> {
        const result = await this.productService.findOneById(id, {
            populate: population,
            projection,
        });

        if (!result) throw new NotFoundException('The item does not exist');

        return result;
    }
}
