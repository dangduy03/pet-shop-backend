import { Injectable } from "@nestjs/common";
import { BaseRepository } from "base/base.repository";
import { Category, CategoryDocument } from "./schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class CategoryRepository extends BaseRepository<CategoryDocument> {
    constructor(@InjectModel(Category.name) categoryModel: PaginateModel<CategoryDocument>) {
        super(categoryModel);
    }
}