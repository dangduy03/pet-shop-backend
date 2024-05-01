import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryService } from './category.service';
import CategoryRepository from './category.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Category.name, schema: CategorySchema
  }])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository]
})
export class CategoryModule { }
