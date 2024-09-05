import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dot/user.dot';
import { Public } from './auth.decorator';
import { md5 } from 'js-md5';
import { md5Constants } from './constants';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() userInfo: UserDto) {
        return this.authService.signIn({
            ...userInfo,
            password: md5.hmac(md5Constants.secret, userInfo.password),
        });
    }

    // @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
