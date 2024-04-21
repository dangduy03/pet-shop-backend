import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { User } from './schema/user.schema';

import { UserService } from './user.service';
import UserRepository from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name, schema: UserSchema
  }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule { }
