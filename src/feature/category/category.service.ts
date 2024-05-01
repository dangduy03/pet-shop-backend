import { Injectable } from '@nestjs/common';
import CategoryRepository from './category.repository';
import BaseService from 'base/base.service';
import { CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService extends BaseService<CategoryDocument> {
    constructor(
        readonly categoryRepository: CategoryRepository
    ) {
        super(categoryRepository);
    }
 
}
