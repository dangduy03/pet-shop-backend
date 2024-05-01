import { Injectable } from '@nestjs/common';
import CartRepository from './cart.repository';
import BaseService from 'base/base.service';
import { CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService extends BaseService<CartDocument> {
    constructor(
        readonly cartRepository: CartRepository
    ) {
        super(cartRepository);
    }
    async 
}
