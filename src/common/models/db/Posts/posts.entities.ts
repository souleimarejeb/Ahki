import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { CommentsEntity } from "./comments.entities";
import { BookMarsEntity } from "./bookmarks.entities";
import { MediaEntity } from "./media.entities";
import { ReactionsEntity } from "./reactions.entities";
@Entity('post')
export class PostEntity extends BaseEntity {

    @Column({ default: '' })
    title: string;

    @Column({ default: '' })
    tags: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => UserEntity, (user) => user.Posts)
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => CommentsEntity, (comment) => comment.post)
    comments: CommentsEntity[];

    @OneToMany(() => BookMarsEntity, (bookMarks) => bookMarks.post)
    bookMarks: BookMarsEntity[];

    @OneToMany(() => MediaEntity, (media) => media.post)
    media: MediaEntity[];

    @OneToMany(() => ReactionsEntity, (reactions) => reactions.post)
    reactions: ReactionsEntity[];
}

