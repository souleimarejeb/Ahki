import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/models/db/user.entity';
import { PostEntity } from 'src/common/models/db/Posts/posts.entity';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entity';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            PostEntity,
            CommentsEntity,
            ReactionsEntity
        ])],
    controllers: [UserController],
    providers: [UserService]
})
export class UsersModule { }
