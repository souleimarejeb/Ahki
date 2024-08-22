import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/models/db/user.entity';
import { TokenHistoryEntity } from 'src/common/models/db/Token/tokenHistory.entity';
import { TokenSourceEntity } from 'src/common/models/db/Token/tokenSource.entity';
import { PostEntity } from 'src/common/models/db/Posts/posts.entities';
import { MediaEntity } from 'src/common/models/db/Posts/media.entities';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entities';
import { BookMarsEntity } from 'src/common/models/db/Posts/bookmarks.entities';
import { InviteEntity } from 'src/common/models/db/Invitations/invite.entities';
import { InviteRedemptionEntity } from 'src/common/models/db/Invitations/invite_redemption.entities';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entities';
import { PostController } from './Controllers/post.controller';
import { PostService } from './Services/post.service';
import { CommentController } from './Controllers/comment.controller';
import { ReactionsController } from './Controllers/reactions.controller';
import { CommentsService } from './Services/comments.service';
import { ReactionService } from './Services/reaction.service';
import { BookmarksService } from './Services/bookmarks.service';
import { MediaController } from './Controllers/media.controller';
import { BookmarksController } from './Controllers/bookmarks.controller';
import { MediaService } from './Services/media.service';
import { UserService } from '../user/Services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity,
        TokenHistoryEntity,
        TokenSourceEntity,
        PostEntity,
        MediaEntity,
        CommentsEntity,
        BookMarsEntity,
        InviteEntity,
        InviteRedemptionEntity,
        ReactionsEntity
    ])],
    controllers: [
        PostController,
        CommentController,
        ReactionsController,
        BookmarksController,
        MediaController
    ],
    providers: [
        PostService,
        CommentsService,
        ReactionService,
        BookmarksService,
        MediaService,
        UserService,
    ]
})
export class PostModule {
}
