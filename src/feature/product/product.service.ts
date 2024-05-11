import { Injectable } from '@nestjs/common';
import ProductRepository from './product.repository';
import BaseService from 'base/base.service';
import { ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from 'src/provider/upload-file-service/upload.service';

@Injectable()
export class ProductService extends BaseService<ProductDocument> {
    constructor(
        readonly productRepository: ProductRepository,
        readonly uploadService: UploadService
    ) {
        super(productRepository);
        
    }

    async createProduct(body: CreateProductDto, files: Array<Express.Multer.File>) {
        if (files) {
            let images = [];
            for (let i = 0; i < files.length; i++) {
                const link = await this.uploadService.uploadImage(files[i]);
                images.push(link);
            }
            body.images = images;
        }

        const result = await this.productRepository.create(body);
        return result;
    }

}
