import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GenderEnum } from "../enum/gender.enum";
import { StatusProductEnum } from "../enum/status-product.enum";

@Schema({ timestamps: true, collection: "products" })
export class Product {

    @Prop({ type: String, ref: "Category" })
    categoryId: string;

    @Prop({type: String, default: ""})
    name: string;

    @Prop({ type: String, default: "" })
    age: string;

    @Prop({ type: String, default: GenderEnum.MALE })
    gender: GenderEnum;

    @Prop({ type: String, default: "" })
    color: string;

    @Prop({ type: String, default: StatusProductEnum.AVAILABLE })
    status: StatusProductEnum;

    @Prop({ type: String, default: "" })
    origin: string;

    @Prop({ type: String, default: "" })
    description: string;

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({ type: Number, default: 0})
    price: number;
}
export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
