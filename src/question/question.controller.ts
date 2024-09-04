import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Query,
    Post,
    Delete,
} from '@nestjs/common';
import { QuestionDto } from './dot/question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}
    // 分页
    @Get()
    async getQuestions(
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        const list = await this.questionService.findAllList({
            keyword,
            page,
            pageSize,
        });

        const count = await this.questionService.findAllCount({ keyword });

        return {
            list,
            count,
        };
    }
    // 创建问卷
    @Post()
    createQuestion(@Body() questionDto: QuestionDto) {
        return this.questionService.create(questionDto);
    }
    // 获取问卷列表
    @Get('list')
    getQuestionsList() {
        return this.questionService.findAll();
    }
    // 获取单个问卷
    @Get(':id')
    getQuestionById(@Param('id') id: string) {
        return this.questionService.findOne(id);
    }
    // 删除问卷
    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.delete(id);
    }
    // 更新问卷
    @Patch(':id')
    updateQuestion(@Param('id') id: string, @Body() qusetion: QuestionDto) {
        return this.questionService.update(id, qusetion);
    }

    @Get('/error')
    testError() {
        throw new HttpException('问卷获取错误', HttpStatus.BAD_REQUEST);
    }

    @Patch(':id')
    updateQuestions(@Param('id') id: string, @Body() questionDto: QuestionDto) {
        const { title, desc } = questionDto;
        console.log(questionDto, 'question');

        return {
            id,
            title,
            desc,
        };
    }
}
