import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";


@Schema({ timestamps: true, collection: "carts" })
export class Cart {

    @Prop({ type: String, ref: "User" })
    userId: string;

    @Prop({ type: [
        {
            productId: {type: String, ref: "Product"},
            quantity: {type: Number, default: 0}
        }
    ], default: [] })
    products: {
        productId: string,
        quantity: number,
    }[];

}
export type CartDocument = HydratedDocument<Cart>;
export const CartSchema = SchemaFactory.createForClass(Cart);
