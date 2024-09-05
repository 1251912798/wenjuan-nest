import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dot/user.dot';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    // 注册
    async create(userInfo: UserDto) {
        const newUser = new this.userModel(userInfo);
        return await newUser.save();
    }

    // 登录
    async signIn({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) {
        return await this.userModel.findOne({ username, password });
    }
}
