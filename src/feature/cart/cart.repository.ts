import { Injectable } from "@nestjs/common";
import { BaseRepository } from "base/base.repository";
import { Cart, CartDocument } from "./schema/cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class CartRepository extends BaseRepository<CartDocument> {
    constructor(@InjectModel(Cart.name) cartModel: PaginateModel<CartDocument>) {
        super(cartModel);
    }
}