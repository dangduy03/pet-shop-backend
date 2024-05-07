import { Injectable } from '@nestjs/common';
import BillRepository from './bill.repository';
import BaseService from 'base/base.service';
import { BillDocument } from './schema/bill.schema';
import { CartService } from '../cart/cart.service';

@Injectable()
export class BillService extends BaseService<BillDocument> {
    constructor(
        readonly billRepository: BillRepository,
        readonly cartService: CartService
    ) {
        super(billRepository);
    }

    async emptyPurchaseCart(userId: string){
        const result = await this.cartService.emptyCart(userId);
        return result;
    }

}
