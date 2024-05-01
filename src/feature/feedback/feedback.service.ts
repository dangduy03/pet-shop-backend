import { Injectable } from '@nestjs/common';
import FeedbackRepository from './feedback.repository';
import BaseService from 'base/base.service';
import { FeedbackDocument } from './schema/feedback.schema';

@Injectable()
export class FeedbackService extends BaseService<FeedbackDocument> {
    constructor(
        readonly feedbackRepository: FeedbackRepository
    ) {
        super(feedbackRepository);
    }
}
