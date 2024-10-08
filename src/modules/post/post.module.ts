import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/models/db/user.entity';
import { PostEntity } from 'src/common/models/db/Posts/posts.entity';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entity';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entity';
import { PostController } from './Controllers/post.controller';
import { PostService } from './Services/post.service';
import { CommentController } from './Controllers/comment.controller';
import { ReactionsController } from './Controllers/reactions.controller';
import { CommentsService } from './Services/comments.service';
import { ReactionService } from './Services/reaction.service';
import { UserService } from '../users/user.service';
import { BookmarksEntity } from 'src/common/models/db/Posts/bookmarks.entity';
import { BookmarksService } from './Services/bookmarks.service';
import { BookmarksController } from './Controllers/bookmark.controller';
import { PaginatorService } from 'src/common/Utils/Paginator.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            PostEntity,
            CommentsEntity,
            ReactionsEntity,
            BookmarksEntity
        ])],
    controllers: [
        PostController,
        CommentController,
        ReactionsController,
        BookmarksController
    ],
    providers: [
        PostService,
        CommentsService,
        ReactionService,
        UserService,
        BookmarksService,
        PaginatorService
    ]
})
export class PostModule {
}
