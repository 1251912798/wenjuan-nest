import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dot/user.dot';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 注册
    @Post('register')
    async register(@Body() userInfo: UserDto) {
        try {
            return await this.userService.create(userInfo);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
