import { Injectable } from '@nestjs/common';
import BillRepository from './bill.repository';
import BaseService from 'base/base.service';
import { BillDocument } from './schema/bill.schema';
import { CartService } from '../cart/cart.service';
import { StatusBillEnum } from './enum/status-bill.enum';
import { ProductService } from '../product/product.service';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillService extends BaseService<BillDocument> {
    constructor(
        readonly billRepository: BillRepository,
        readonly cartService: CartService,
        readonly productService: ProductService
    ) {
        super(billRepository);
    }

    async emptyPurchaseCart(userId: string) {
        const result = await this.cartService.emptyCart(userId);
        return result;
    }

    async updateProductQuantity(body: UpdateBillDto) {
        // status bill
        switch (body.status) {
            case StatusBillEnum.CONFIRMED: {
                body.products.forEach(async (productCart) => {
                    await this.productService.updateOneBy({
                        _id: productCart.productId
                    }, {
                        $inc: {quantity: productCart.quantity}
                    });
                });
                break;
            }
            case StatusBillEnum.CANCELLED: {
                await body.products.forEach(async (productCart) => {
                    await this.productService.updateOneBy({
                        _id: productCart.productId
                    }, {
                        $inc: {quantity: productCart.quantity}
                    });
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}


