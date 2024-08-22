import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserEntity } from "../user.entity";
import { PostEntity } from "./posts.entities";

@Entity('reactions')
export class ReactionsEntity extends BaseEntity {

    @Column({ default: '' })
    type: string;

    @ManyToOne(() => UserEntity, (user) => user.reactions)
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.reactions)
    post: PostEntity;
}

