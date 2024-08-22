import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserEntity } from "../user.entity";
import { CommentsEntity } from "./comments.entities";
import { ReactionsEntity } from "./reactions.entities";

@Entity('posts')
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

    @OneToMany(() => ReactionsEntity, (reactions) => reactions.post)
    reactions: ReactionsEntity[];
}

