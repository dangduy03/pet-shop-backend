import { Injectable } from "@nestjs/common";
import BaseRepository from "base/base.repository";
import { Product, ProductDocument } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class ProductRepository extends BaseRepository<ProductDocument> {
    constructor(@InjectModel(Product.name) productModel: PaginateModel<ProductDocument>) {
        super(productModel);
    }
}