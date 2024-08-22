import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from 'src/common/models/db/Posts/posts.entities';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entities';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entities';
import { UserService } from 'src/modules/user/Services/user.service';
import { IPostInterface } from 'src/common/models/Interfaces/postInterface';

@Injectable()
export class PostService {
    createQueryBuilder: any;

    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        @InjectRepository(ReactionsEntity) private reactionRepository: Repository<ReactionsEntity>,
        @InjectRepository(CommentsEntity) private CommentRepository: Repository<CommentsEntity>,
        private readonly userService: UserService,

    ) { }

    async create(id: string, payloads: Partial<IPostInterface>) {

        try {
            const user = await this.userService.findOne(id);

            if (!user) throw new HttpException('Post not found. Cannot Create post ', HttpStatus.BAD_REQUEST);

            const newpost = this.postRepository.create({
                ...payloads,
                user: user[0],
            });

            return this.postRepository.save(newpost);

        } catch (error) {
            console.error("Error saving post:", error);
            throw new HttpException('Failed to create post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    findAll() {
        try {
            return this.postRepository.find({ relations: ['user'] });
        } catch (error) {
            console.error("Error finiding posts:", error);
            throw new HttpException('Failed to find posts.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string, Objc: Object) {
        try {
            let post = null;
            if (Objc === null)
                post = this.postRepository.findOne({ where: { id } })

            if (Objc)
                post = this.postRepository.find({
                    relations: {
                        comments: true,
                    },
                    where: { id },
                });

            if (!post) throw new HttpException('Post not found. Cannot dispaly it ', HttpStatus.BAD_REQUEST);

            const countReaction = await this.reactionRepository
                .createQueryBuilder("reaction")
                .where("reaction.postid = :id", { id })
                .getCount()
            const countComment = await this.CommentRepository
                .createQueryBuilder("comment")
                .where("comment.postid = :id", { id })
                .getCount()


            return {
                data: post,
                reactions: countReaction,
                comments: countComment
            };

        } catch (error) {

            console.error("Error loading  post:", error);
            throw new HttpException('Failed to load the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, payloads: Partial<IPostInterface>) {
        try {

            return await this.postRepository.update({ id }, { ...payloads });

        } catch (error) {
            console.error("Error updating post:", error);
            throw new HttpException('Failed to update the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        try {
            return this.postRepository.delete({ id });
        } catch (error) {
            console.error("Error removing  post:", error);
            throw new HttpException('Failed to remove the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
