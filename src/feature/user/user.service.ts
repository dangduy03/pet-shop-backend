import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import BaseService from 'base/base.service';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService extends BaseService<UserDocument> {
    constructor(
        readonly userRepository: UserRepository
    ) {
        super(userRepository);
    }
}
