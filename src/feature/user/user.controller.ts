import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiQueryParams } from 'util/decorator/api-query-params.decorator';
import AqpDto from 'util/interceptor/aqp/aqp.dto';
import ParseObjectIdPipe from 'util/pipe/parse-object.pipe';
import { Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'util/decorator/get-current-user-id.decorator';
import { Public } from 'util/guard/jwt.guard';
import { GetCurrentUser } from 'util/decorator/get-current-user';

@ApiTags("Users")
@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) { }

    @Get('')
    async findAll(
        @ApiQueryParams() { filter, population, ...options }: AqpDto,
    ): Promise<any> {
        return this.userService.findManyBy(filter, {
            populate: population,
            options,
        });
    }

    @Get('get-user-token')
    async getUserToken(
        @GetCurrentUser() userId : Types.ObjectId
    ): Promise<any>{
    return this.userService.findOneById(userId);
    }

    @Post('')
    @HttpCode(201)
    async create(@Body() body: CreateUserDto): Promise<any> {
        const result = await this.userService.create(body);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: UpdateUserDto,
    ): Promise<any> {
        const result = await this.userService.updateOneById(id, body);
        return result;
    }

    @Delete(':ids/ids')
    async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
        const result = await this.userService.deleteManyHardByIds(
            ids.split(',').map((item: any) => new Types.ObjectId(item)),
        );
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    ): Promise<any> {
        const result = await this.userService.deleteOneHardById(id);
        return result;
    }

    @Get('paginate')
    async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
        return this.userService.paginate(query);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @ApiQueryParams() { filter, population, projection }: AqpDto,
    ): Promise<any> {
        const result = await this.userService.findOneById(id, {
            populate: population,
            projection,
        });

        if (!result) throw new NotFoundException('The item does not exist');

        return result;
    }
}
