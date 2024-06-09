import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import AQPMiddleware from 'util/interceptor/aqp/aqp.middleware';
import { UploadModule } from './provider/upload-file-service/upload.module';
import { LoggingMiddleware } from 'util/middleware/logging.middleware';

const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 20,
  page: 1,
};

const routers = [
  UserModule,
  ProductModule,
  AuthModule,
  CategoryModule,
  CartModule,
  BillModule,
  FeedbackModule,
  UploadModule
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dangduynguyen03:chicungduoc1403@cluster0.gxuoedq.mongodb.net/pet-shop-db?retryWrites=true&w=majority&appName=Cluster0',{
      connectionFactory: (connection) =>{
        connection.plugin(mongoosePaginate);
        return connection;
      }
    }),
    RedisModule.forRoot({
      config: {
        host: 'redis-11307.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11307,
        password: 'mLJZviM4fpMlVH2LJ1uZGgehVlMKIAGD'
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
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AQPMiddleware).forRoutes({
      path: '*', method: RequestMethod.GET
    });
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
