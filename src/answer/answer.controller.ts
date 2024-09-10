import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { answerDto } from './dot/answer.dot';
import { Public } from 'src/auth/auth.decorator';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Public()
    @Post()
    createAnswer(@Body() answerInfo: answerDto) {
        return this.answerService.create(answerInfo);
    }
}
