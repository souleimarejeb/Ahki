import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserEntity } from "../user.entity";
import { PostEntity } from "./posts.entity";

@Entity('post_mgmt__bookmarks')
export class BookmarksEntity extends BaseEntity {


    @ManyToOne(() => UserEntity, (user) => user.bookmarks)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.bookmarks, { onDelete: 'CASCADE' })
    @JoinColumn()
    post: PostEntity;
}

