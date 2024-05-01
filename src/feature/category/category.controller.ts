import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiQueryParams } from 'util/decorator/api-query-params.decorator';
import AqpDto from 'util/interceptor/aqp/aqp.dto';
import ParseObjectIdPipe from 'util/pipe/parse-object.pipe';
import { Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Categorys")
@Controller('category')
export class CategoryController {
    constructor(readonly categoryService: CategoryService) { }

    @Get('')
    async findAll(
        @ApiQueryParams() { filter, population, ...options }: AqpDto,
    ): Promise<any> {
        return this.categoryService.findManyBy(filter, {
            populate: population,
            options,
        });
    }

    @Post('')
    @HttpCode(201)
    async create(@Body() body: CreateCategoryDto): Promise<any> {
        const result = await this.categoryService.create(body);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: UpdateCategoryDto,
    ): Promise<any> {
        const result = await this.categoryService.updateOneById(id, body);
        return result;
    }

    @Delete(':ids/ids')
    async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
        const result = await this.categoryService.deleteManyHardByIds(
            ids.split(',').map((item: any) => new Types.ObjectId(item)),
        );
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    ): Promise<any> {
        const result = await this.categoryService.deleteOneHardById(id);
        return result;
    }

    @Get('paginate')
    async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
        return this.categoryService.paginate(query);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @ApiQueryParams() { filter, population, projection }: AqpDto,
    ): Promise<any> {
        const result = await this.categoryService.findOneById(id, {
            populate: population,
            projection,
        });

        if (!result) throw new NotFoundException('The item does not exist');

        return result;
    }
}
