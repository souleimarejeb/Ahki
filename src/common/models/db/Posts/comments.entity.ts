import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserEntity } from "../user.entity";
import { PostEntity } from "./posts.entity";

@Entity('post_mgmt__comments')
export class CommentsEntity extends BaseEntity {

    @Column({ default: '' })
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn()
    post: PostEntity;
}

