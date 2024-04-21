import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";
import { GenderEnum } from "../enum/gender.enum";
import { StatusEnum } from "../enum/status.enum";

@Schema({ timestamps: true, collection: "products" })
export class Product {

    @Prop({ type: String, ref: "Category" })
    categoryId: string;

    @Prop({ type: String, default: "" })
    age: string;

    @Prop({ type: String, default: GenderEnum.MALE })
    gender: GenderEnum;

    @Prop({ type: String, default: "" })
    color: string;

    @Prop({ type: String, default: StatusEnum.AVAILABLE })
    status: StatusEnum;

    @Prop({ type: String, default: "" })
    origin: string;

    @Prop({ type: String, default: "" })
    description: string;

    @Prop({ type: [String], default: [] })
    images: string[];
}
export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
