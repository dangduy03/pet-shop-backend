import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';
import { FeedbackService } from './feedback.service';
import FeedbackRepository from './feedback.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Feedback.name, schema: FeedbackSchema
  }])],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  exports: [FeedbackService, FeedbackRepository]
})
export class FeedbackModule { }
