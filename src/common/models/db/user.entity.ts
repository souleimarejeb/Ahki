import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.model";
import { PostEntity } from "./Posts/posts.entities";
import { CommentsEntity } from "./Posts/comments.entities";
import { ReactionsEntity } from "./Posts/reactions.entities";

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

    @OneToMany(() => CommentsEntity, (comment) => comment.user)
    comments: CommentsEntity[];

    @OneToMany(() => PostEntity, (Post) => Post.user)
    Posts: PostEntity[];

    @OneToMany(() => ReactionsEntity, (reactions) => reactions.user)
    reactions: ReactionsEntity[];

}

