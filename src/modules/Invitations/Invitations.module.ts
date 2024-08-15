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
import { InviteController } from './Controllers/invite.controller';
import { InviteRedemptionController } from './Controllers/invite_redemption.controller';
import { InviteService } from './Services/invite.service';
import { InviteRedemptionService } from './Services/invite_redemption.service';


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
        InviteController,
        InviteRedemptionController
    ],
    providers: [
        InviteService,
        InviteRedemptionService
    ]
})
export class InvitationsModule { }
