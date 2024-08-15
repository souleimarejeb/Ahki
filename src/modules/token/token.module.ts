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
import { TokenHistoryController } from './Controllers/token_history.controller';
import { TokenHistoryService } from './Services/token_history.service';
import { TokenSourceController } from './Controllers/token_source.controller';
import { TokenSourceService } from './Services/token_source.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
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
        TokenHistoryController,
        TokenSourceController
    ],
    providers: [
        TokenHistoryService,
        TokenSourceService
    ]
})
export class tokenModule { }
