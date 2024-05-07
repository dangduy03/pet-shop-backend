import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductService } from './product.service';
import ProductRepository from './product.repository';
import { UploadModule } from 'src/provider/upload-file-service/upload.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Product.name, schema: ProductSchema
  }]), UploadModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository]
})
export class ProductModule { }
