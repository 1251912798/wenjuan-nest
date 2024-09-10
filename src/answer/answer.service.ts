import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schema/answer.schema';
import { Model } from 'mongoose';
import { answerDto } from './dot/answer.dot';

@Injectable()
export class AnswerService {
    constructor(
        @InjectModel(Answer.name)
        private readonly answerModel: Model<Answer>,
    ) {}
    async create(answerInfo: answerDto) {
        const { questionId } = answerInfo;
        if (!questionId) {
            throw new HttpException('问卷id不存在', HttpStatus.BAD_REQUEST);
        }
        return await new this.answerModel(answerInfo).save();
    }

    async total(questionId: string) {
        if (!questionId) return 0;
        return await this.answerModel.countDocuments({ questionId });
    }

    async findAll(
        questionId: string,
        options: { page: number; pageSize: number },
    ) {
        if (!questionId) return [];

        const { page = 1, pageSize = 10 } = options;
        const list = await this.answerModel
            .find({ questionId })
            .sort({ createAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        return list;
    }
}
