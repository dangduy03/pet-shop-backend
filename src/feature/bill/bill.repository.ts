import { Injectable } from "@nestjs/common";
import { Bill, BillDocument } from "./schema/bill.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import BaseRepository from "base/base.repository";

@Injectable()
export default class BillRepository extends BaseRepository<BillDocument> {
    constructor(@InjectModel(Bill.name) billModel: PaginateModel<BillDocument>) {
        super(billModel);
    }
}