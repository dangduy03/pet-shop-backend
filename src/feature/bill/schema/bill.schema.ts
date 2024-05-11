import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { StatusBillEnum } from "../enum/status-bill.enum";
import { PayMethodEnum } from "../enum/pay-method.enum";


@Schema({ timestamps: true, collection: "bills" })
export class Bill {

    @Prop({ type: String, ref: "User" })
    userId: string;

    @Prop({ type: String, default: "" })
    address: string;

    @Prop({ type: String, default: StatusBillEnum.WAITING })
    status: StatusBillEnum;

    @Prop({ type: String, default: PayMethodEnum.DIRECT })
    payMethod: PayMethodEnum;

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

    @Prop({ type: Number, default: 0 })
    totalPrice: number;

}
export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);
