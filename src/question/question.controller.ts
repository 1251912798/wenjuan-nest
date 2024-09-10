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
    Request,
    Res,
} from '@nestjs/common';
import { QuestionDto } from './dot/question.dto';
import { QuestionService } from './question.service';
import { sendSuccessResponse } from 'src/auth/sendResponse';
import { Public } from 'src/auth/auth.decorator';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}
    // 分页
    @Get()
    async getQuestions(
        @Request() req: any,
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('isStar') isStar: boolean,
        @Query('isDeleted') isDeleted: boolean,
    ) {
        const { username } = req.user;
        const list = await this.questionService.findAllList({
            keyword,
            page,
            pageSize,
            isStar,
            isDeleted,
            author: username,
        });

        const total = await this.questionService.findAllCount({
            keyword,
            isStar,
            isDeleted,
            author: username,
        });

        return {
            list,
            total,
        };
    }
    // 创建问卷
    @Post()
    createQuestion(@Request() req: any) {
        const { username } = req.user;
        return this.questionService.create(username);
    }
    // 获取问卷列表
    @Get('list')
    getQuestionsList() {
        return this.questionService.findAll();
    }
    // 获取单个问卷
    @Public()
    @Get(':id')
    getQuestionById(@Param('id') id: string) {
        return this.questionService.findOne(id);
    }
    // 删除问卷
    // @Delete(':id')
    // deleteQuestion(@Param('id') id: string, @Request() req: any) {
    //     const { username } = req.user;
    //     return this.questionService.delete(id, username);
    // }
    // 更新问卷
    @Patch(':id')
    updateQuestion(
        @Param('id') id: string,
        @Body() qusetion: QuestionDto,
        @Request() req: any,
    ) {
        const { username } = req.user;
        return this.questionService.update(id, qusetion, username);
    }

    // 批量删除
    @Delete()
    async delMany(
        @Body() ids: string[] = [],
        @Request() req: any,
        @Res() res: any,
    ) {
        const { username } = req.user;
        if (!ids.length) return;
        return this.questionService
            .delMany(ids, username)
            .then(() => {
                return sendSuccessResponse(res, '问卷删除成功!');
            })
            .catch((error) => {
                throw new HttpException(error, HttpStatus.BAD_REQUEST);
            });
    }

    // 复制问卷
    @Post('copy/:id')
    copyQuestion(@Param('id') id: string, @Request() req: any) {
        const { username } = req.user;
        return this.questionService.copyQuestion(id, username);
    }

    @Get('/error')
    testError() {
        throw new HttpException('问卷获取错误', HttpStatus.BAD_REQUEST);
    }

    @Patch(':id')
    updateQuestions(@Param('id') id: string, @Body() questionDto: QuestionDto) {
        const { title, desc } = questionDto;
        return {
            id,
            title,
            desc,
        };
    }
}
