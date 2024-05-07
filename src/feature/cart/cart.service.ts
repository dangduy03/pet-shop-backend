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

    async addToCart(productId: string, userId: string, quantity: number) {
        const cart = await this.cartRepository.findOneBy({ userId });
        const check = cart.products.find((product) => product.productId == productId);
        let result;
        if (check) {
            result = await this.cartRepository.updateOneBy({
                userId: userId,
                'products.productId': productId
            }, {
                $inc: { 'products.$.quantity': quantity }
            })
        } else {
            result = await this.cartRepository.updateOneBy({
                userId: userId,
            }, {
                $push: {
                    products: {
                        productId: productId,
                        quantity: 1
                    }
                }
            });
        }
        return result;
    }


    async desceaseCartQuantity(productId: string, userId: string){
        const result = await this.cartRepository.updateOneBy({
            userId: userId,
            'products.productId': productId
        }, {
            $inc: { 'products.$.quantity': -1 }
        })

        return result;
    }

    async emptyCart(userId: string){
        const result = await this.cartRepository.updateOneBy({userId},{products: []});
        return result;
    }
}
