import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
    timestamps: true, // 设置 createdAt 和 updatedAt
})
export class Question {
    @Prop({ required: true })
    title: string;

    @Prop()
    desc: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
