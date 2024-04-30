import { Injectable } from "@nestjs/common";
import { BaseRepository } from "base/base.repository";
import { Feedback, FeedbackDocument } from "./schema/feedback.schema";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

@Injectable()
export default class FeedbackRepository extends BaseRepository<FeedbackDocument> {
    constructor(@InjectModel(Feedback.name) feedbackModel: PaginateModel<FeedbackDocument>) {
        super(feedbackModel);
    }
}