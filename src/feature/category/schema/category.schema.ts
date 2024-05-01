import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";
import { TypeEnum } from "../enum/type.enum";

@Schema({ timestamps: true, collection: "categorys" })
export class Category {

    @Prop({ type: String, default: "" })
    name: string;

    @Prop({ type: String, default: TypeEnum.CAT })
    type: TypeEnum;


}
export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
