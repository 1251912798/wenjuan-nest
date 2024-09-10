import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({
    timestamps: true,
})
export class Answer {
    @Prop({ required: true })
    questionId: string; // 问卷Id

    @Prop()
    answerList: {
        componentId: string; // fe_id
        value: string[];
    }[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
