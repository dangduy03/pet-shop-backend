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


const routers = [
  UserModule,
  ProductModule,
  AuthModule,
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dangduynguyen03:chicungduoc1403@cluster0.gxuoedq.mongodb.net/pet-shop-db?retryWrites=true&w=majority&appName=Cluster0'),
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
