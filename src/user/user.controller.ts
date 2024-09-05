import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Redirect,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dot/user.dot';
import { Public } from 'src/auth/auth.decorator';
import { md5 } from 'js-md5';
import { md5Constants } from 'src/auth/constants';
import { sendSuccessResponse } from 'src/auth/sendResponse';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 注册
    @Public()
    @Post('register')
    async register(@Body() userInfo: UserDto, @Res() res: any) {
        try {
            await this.userService.create({
                ...userInfo,
                password: md5.hmac(md5Constants.secret, userInfo.password),
            });
            return sendSuccessResponse(res, '注册成功!');
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    // 登陆
    @Public()
    @Post('login')
    @Redirect('/api/auth/login', HttpStatus.TEMPORARY_REDIRECT) // 307
    login() {
        return;
    }

    @Get('info')
    @Redirect('/api/auth/profile', HttpStatus.FOUND) // 302
    getUserInfo() {
        return;
    }
}
