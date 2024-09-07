import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { ComponentType } from 'type/type';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
    timestamps: true, // 设置 createdAt 和 updatedAt
})
export class Question {
    @Prop({ required: true })
    title: string;

    @Prop()
    desc: string;

    @Prop()
    js: string;

    @Prop()
    css: string;

    @Prop({ default: false })
    isPublished: boolean;

    @Prop({ default: false })
    isStar: boolean;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop()
    componentList: ComponentType[];

    @Prop({ required: true })
    author: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
