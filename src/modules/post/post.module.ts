import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/models/db/user.entity';
import { PostEntity } from 'src/common/models/db/Posts/posts.entities';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entities';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entities';
import { PostController } from './Controllers/post.controller';
import { PostService } from './Services/post.service';
import { CommentController } from './Controllers/comment.controller';
import { ReactionsController } from './Controllers/reactions.controller';
import { CommentsService } from './Services/comments.service';
import { ReactionService } from './Services/reaction.service';
import { UserService } from '../user/Services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity,
        PostEntity,
        CommentsEntity,
        ReactionsEntity
    ])],
    controllers: [
        PostController,
        CommentController,
        ReactionsController
    ],
    providers: [
        PostService,
        CommentsService,
        ReactionService,
        UserService,
    ]
})
export class PostModule {
}
