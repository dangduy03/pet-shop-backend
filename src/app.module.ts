import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './feature/user/user.module';
import { ProductModule } from './feature/product/product.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'util/guard/jwt.guard';
import { CategoryModule } from './feature/category/category.module';
import { CartModule } from './feature/cart/cart.module';
import { BillModule } from './feature/bill/bill.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { FeedbackModule } from './feature/feedback/feedback.module';


const routers = [
  UserModule,
  ProductModule,
  AuthModule,
  CategoryModule,
  CartModule,
  BillModule,
  FeedbackModule
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dangduynguyen03:chicungduoc1403@cluster0.gxuoedq.mongodb.net/pet-shop-db?retryWrites=true&w=majority&appName=Cluster0'),
    RedisModule.forRoot({
      config: {
        host: 'redis-18481.c11.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 18481,
        password: 'dGjEFNE7VJuF6mK6plJKApIuf0RklhS0'
      }
    }),
    ...routers,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
