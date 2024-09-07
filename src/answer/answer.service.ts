import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schema/answer.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnswerService {
    constructor(
        @InjectModel(Answer.name)
        private readonly AnswerModel: Model<Answer>,
    ) {}
}
