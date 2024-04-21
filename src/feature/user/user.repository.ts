import { Injectable } from "@nestjs/common";
import { BaseRepository } from "base/base.repository";
import { User, UserDocument } from "./schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) userModel: PaginateModel<UserDocument>) {
        super(userModel);
    }
}