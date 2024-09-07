import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Question } from './schema/question.schema';
import { QuestionDto } from './dot/question.dto';
import { nanoid } from 'nanoid';
@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name)
        private readonly qusetionModel: Model<Question>,
    ) {}

    // 创建
    async create(username: string) {
        const createdQuestion = new this.qusetionModel({
            title: '问卷标题' + +new Date(),
            desc: '问卷描述',
            js: '',
            css: '',
            isDeleted: false,
            isPublished: false,
            isStar: false,
            componentList: [],
            author: username,
        });

        return await createdQuestion.save();
    }

    // 查询全部
    async findAll(): Promise<Question[]> {
        return this.qusetionModel.find().exec();
    }

    // 根据id查询单个
    async findOne(id: string): Promise<QuestionDto> {
        return await this.qusetionModel.findById(id);
    }

    // 删除
    async delete(id: string, username: string) {
        return this.qusetionModel.findOneAndDelete({
            _id: id,
            author: username,
        });
    }

    // 更新
    async update(id: string, qusetion: QuestionDto, username: string) {
        return this.qusetionModel.findByIdAndUpdate(
            { _id: id, author: username },
            { ...qusetion },
        );
    }

    // 分页
    async findAllList({
        keyword = '',
        page = 1,
        pageSize = 10,
        isDeleted = false,
        isStar,
        author = '',
    }): Promise<Question[]> {
        const whereKey: any = {
            isDeleted,
            author,
        };
        if (isStar != null) whereKey.isStar = isStar;
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
    async findAllCount({
        keyword,
        isDeleted = false,
        isStar,
        author = '',
    }): Promise<number> {
        const whereKey: any = {
            isDeleted,
            author,
        };
        if (isStar != null) whereKey.isStar = isStar;
        if (keyword) {
            const reg = new RegExp(keyword, 'i');
            whereKey.title = { $regex: reg };
        }

        return this.qusetionModel.countDocuments(whereKey);
    }

    // 批量删除
    async delMany(ids: string[], username: string): Promise<any> {
        const res = await this.qusetionModel.deleteMany({
            _id: { $in: ids },
            author: username,
        });

        return res;
    }

    // 复制问卷
    async copyQuestion(id: string, username: string) {
        const question = await this.qusetionModel.findById(id);
        const newQuestion = new this.qusetionModel({
            ...question,
            _id: new mongoose.Types.ObjectId(),
            title: question.title + '副本',
            author: username,
            isStar: false,
            isPublished: false,
            componentList: question.componentList.map((item) => ({
                ...item,
                fe_id: nanoid(),
            })),
        });
        return newQuestion.save();
    }
}
