import { Injectable } from '@nestjs/common';
import BillRepository from './bill.repository';
import BaseService from 'base/base.service';
import { BillDocument } from './schema/bill.schema';

@Injectable()
export class BillService extends BaseService<BillDocument> {
    constructor(
        readonly billRepository: BillRepository
    ) {
        super(billRepository);
    }
}
