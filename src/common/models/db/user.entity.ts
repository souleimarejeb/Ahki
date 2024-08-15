import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.model";
import { TokenHistoryEntity } from "./Token/tokenHistory.entity";
import { PostEntity } from "./Posts/posts.entities";
import { CommentsEntity } from "./Posts/comments.entities";
import { BookMarsEntity } from "./Posts/bookmarks.entities";
import { ReactionsEntity } from "./Posts/reactions.entities";
import { InviteEntity } from "./Invitations/invite.entities";
import { InviteRedemptionEntity } from "./Invitations/invite_redemption.entities";

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({ default: '', unique: true })
    username: string;

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @Column({ default: '', unique: true })
    email: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: 0 })
    tokenBlance: number;

    @Column({ default: true })
    status: boolean;

    @Column({ default: '' })
    links: string;

    @Column({ default: '' })
    idAuthentication: string;

    @OneToMany(() => TokenHistoryEntity, (tokenHistory) => tokenHistory.user)
    tokenHistories: TokenHistoryEntity[];

    @OneToMany(() => CommentsEntity, (comment) => comment.user)
    comments: CommentsEntity[];

    @OneToMany(() => PostEntity, (Post) => Post.user)
    Posts: PostEntity[];

    @OneToMany(() => BookMarsEntity, (bookMarks) => bookMarks.user)
    bookMarks: BookMarsEntity[];

    @OneToMany(() => ReactionsEntity, (reactions) => reactions.user)
    reactions: ReactionsEntity[];

    @OneToMany(() => InviteEntity, (invite) => invite.user)
    invites: InviteEntity[];

    @OneToMany(() => InviteRedemptionEntity, (inviteRedemption) => inviteRedemption.user)
    inviteRedemption: InviteRedemptionEntity[];
}

