import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema({ timestamps: true, collection: "feedbacks" })
export class Feedback {

    @Prop({ type: String, ref: "User" })
    userId: string;

    @Prop({ type: String, default: "" })
    image: string;

    @Prop({ type: String, default: "" })
    description: string;

}
export type FeedbackDocument = HydratedDocument<Feedback>;
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
