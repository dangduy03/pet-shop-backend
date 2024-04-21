import { Injectable } from '@nestjs/common';
import ProductRepository from './product.repository';
import BaseService from 'base/base.service';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService extends BaseService<ProductDocument> {
    constructor(
        readonly productRepository: ProductRepository
    ) {
        super(productRepository);
    }
    async 
}
