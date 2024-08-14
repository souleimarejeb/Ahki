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
import { InviteRedmptionEntity } from 'src/common/models/db/Invitations/invite_redemption.entities';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entities';

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity, TokenHistoryEntity, TokenSourceEntity,
        PostEntity, MediaEntity, CommentsEntity, BookMarsEntity,
        InviteEntity, InviteRedmptionEntity, ReactionsEntity])],
    controllers: [],
    providers: []
})
export class UsersModule { }
