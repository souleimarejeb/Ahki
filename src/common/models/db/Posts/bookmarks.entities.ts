import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { PostEntity } from "./posts.entities";

@Entity('bookmarks')
export class BookMarsEntity extends BaseEntity {

    @ManyToOne(() => UserEntity, (user) => user.bookMarks)
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.bookMarks, { onDelete: 'CASCADE' })
    post: PostEntity;
}

