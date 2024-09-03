import { Controller, Get } from '@nestjs/common';

@Controller('question')
export class QuestionController {
    @Get()
    getQuestions(): string {
        return 'Questions';
    }
}
