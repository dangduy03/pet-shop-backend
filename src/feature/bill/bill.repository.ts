import { Injectable } from "@nestjs/common";
import { BaseRepository } from "base/base.repository";
import { Bill, BillDocument } from "./schema/bill.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class BillRepository extends BaseRepository<BillDocument> {
    constructor(@InjectModel(Bill.name) billModel: PaginateModel<BillDocument>) {
        super(billModel);
    }
}