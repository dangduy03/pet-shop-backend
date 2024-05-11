import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BillService } from './bill.service';
import { ApiQueryParams } from 'util/decorator/api-query-params.decorator';
import AqpDto from 'util/interceptor/aqp/aqp.dto';
import ParseObjectIdPipe from 'util/pipe/parse-object.pipe';
import { Types } from 'mongoose';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ApiTags } from '@nestjs/swagger';
import { StatusBillEnum } from './enum/status-bill.enum';
import { GetCurrentUserId } from 'util/decorator/get-current-user-id.decorator';

@ApiTags("Bills")
@Controller('bill')
export class BillController {
    constructor(readonly billService: BillService) { }

    @Get('')
    async findAll(
        @ApiQueryParams() { filter, population, ...options }: AqpDto,
    ): Promise<any> {
        return this.billService.findManyBy(filter, {
            populate: population,
            options,
        });
    }

    @Post('')
    @HttpCode(201)
    async create(
        @GetCurrentUserId() userId: string,    
        @Body() body: CreateBillDto
    ): Promise<any> {
        body.status = StatusBillEnum.WAITING;
        const result = await this.billService.create(body);
        await this.billService.emptyPurchaseCart(userId);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: UpdateBillDto,
    ): Promise<any> {
        const result = await this.billService.updateOneById(id, body);
        await this.billService.updateProductQuantity(body);
        return result;
    }

    @Delete(':ids/ids')
    async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
        const result = await this.billService.deleteManyHardByIds(
            ids.split(',').map((item: any) => new Types.ObjectId(item)),
        );
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    ): Promise<any> {
        const result = await this.billService.deleteOneHardById(id);
        return result;
    }

    @Get('paginate')
    async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
        return this.billService.paginate(query);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @ApiQueryParams() { filter, population, projection }: AqpDto,
    ): Promise<any> {
        const result = await this.billService.findOneById(id, {
            populate: population,
            projection,
        });

        if (!result) throw new NotFoundException('The item does not exist');

        return result;
    }
}
