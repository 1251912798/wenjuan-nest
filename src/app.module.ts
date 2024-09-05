import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        QuestionModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
