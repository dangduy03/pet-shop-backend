import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schema/bill.schema';
import { BillService } from './bill.service';
import BillRepository from './bill.repository';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Bill.name, schema: BillSchema
  }]), CartModule],
  controllers: [BillController],
  providers: [BillService, BillRepository],
  exports: [BillService, BillRepository]
})
export class BillModule { }
