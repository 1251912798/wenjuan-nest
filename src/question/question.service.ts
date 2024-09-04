import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schema/question.schema';
import { QuestionDto } from './dot/question.dto';
@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name) private qusetionModel: Model<Question>,
    ) {}

    // 创建
    async create(createCatDto: QuestionDto): Promise<Question> {
        const createdQuestion = new this.qusetionModel(createCatDto);
        return createdQuestion.save();
    }

    // 查询全部
    async findAll(): Promise<Question[]> {
        return this.qusetionModel.find().exec();
    }

    // 根据id查询单个
    async findOne(id: string): Promise<Question> {
        return this.qusetionModel.findById(id);
    }

    // 删除
    async delete(id: string) {
        return this.qusetionModel.findByIdAndDelete(id);
    }

    // 更新
    async update(id: string, qusetion: Question) {
        return this.qusetionModel.findByIdAndUpdate({ _id: id }, qusetion);
    }

    // 分页
    async findAllList({ keyword, page, pageSize }): Promise<Question[]> {
        const whereKey: any = {};
        if (keyword) {
            const reg = new RegExp(keyword, 'i');
            whereKey.title = { $regex: reg };
        }

        return this.qusetionModel
            .find(whereKey) // 查询条件
            .sort({ _id: -1 }) // 倒序
            .skip((page - 1) * pageSize) // 跳过多少条
            .limit(pageSize); // 每页多少条
    }
    // 查询总数
    async findAllCount({ keyword }): Promise<number> {
        const whereKey: any = {};
        if (keyword) {
            const reg = new RegExp(keyword, 'i');
            whereKey.title = { $regex: reg };
        }

        return this.qusetionModel.countDocuments(whereKey);
    }
}
