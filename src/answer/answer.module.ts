import { Module } from '@nestjs/common';
import { Answer, AnswerSchema } from './schema/answer.schema';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Answer.name, schema: AnswerSchema },
        ]),
    ],
    exports: [AnswerService],
    controllers: [AnswerController],
    providers: [AnswerService],
})
export class AnswerModule {}
