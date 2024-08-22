import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PostEntity } from "./Posts/posts.entity";
import { CommentsEntity } from "./Posts/comments.entity";
import { ReactionsEntity } from "./Posts/reactions.entity";

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({ unique: true })
    username: string;

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @Column({ unique: true })
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
    @JoinColumn() comments: CommentsEntity[];

    @OneToMany(() => PostEntity, (Post) => Post.user)
    @JoinColumn() Posts: PostEntity[];

    @OneToMany(() => ReactionsEntity, (reactions) => reactions.user)
    @JoinColumn() reactions: ReactionsEntity[];

    @BeforeInsert()
    setDefaults() {
        this.username = `user_${Date.now().toString()}`;
        this.email = `${Date.now().toString()}@ahki.tn`;
    }

}

