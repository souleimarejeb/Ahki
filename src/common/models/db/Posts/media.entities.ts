import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { PostEntity } from "./posts.entities";

@Entity('media')
export class MediaEntity extends BaseEntity {

    @Column({ default: '' })
    URL: string;

    @ManyToOne(() => PostEntity, (post) => post.media)
    post: PostEntity;

}

