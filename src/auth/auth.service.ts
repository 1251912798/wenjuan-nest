import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/user/dot/user.dot';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userServer: UserService) {}

    async signIn(userInfo: UserDto) {
        const { username, password } = userInfo;
        const user = await this.userServer.signIn({ username, password });

        if (!user) {
            throw new UnauthorizedException('用户名或密码错误!');
        }

        const { password: pwd, ...userData } = user.toObject(); // eslint-disable-line
        return userData;
    }
}
