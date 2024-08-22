import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entities';
import { IComments } from 'src/common/models/Interfaces/commentInterface';
import { UserService } from 'src/modules/user/Services/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { PostService } from './post.service';
@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity) private commentRepository: Repository<CommentsEntity>,
        private readonly userService: UserService,
        private readonly postService: PostService,


    ) { }

    async create(commentDetails: Partial<IComments>, postId: string, userId: string) {
        try {
            const user = await this.userService.findOne(userId);

            const post = await this.postService.findOne(postId, null);

            if (!user) throw new HttpException('user  not found. Cannot Create comment  ', HttpStatus.BAD_REQUEST);

            if (!post) throw new HttpException('post  not found. Cannot Create post  ', HttpStatus.BAD_REQUEST);

            const newComment = this.commentRepository.create({
                ...commentDetails,
                post: post.data,
                user: user[0],
            });

            return await this.commentRepository.save(newComment);

        } catch (error) {
            console.error("Error saving comment:", error);
            throw new HttpException('Failed to create comment .', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    findAll() {
        return this.commentRepository.find();
    }

    findOne(id: string) {
        return this.commentRepository.findBy({ id });
    }

    async update(id: string, updateComment: Partial<IComments>) {
        try {

            return await this.commentRepository.update({ id }, { ...updateComment });

        } catch (error) {
            console.error("Error updating post:", error);
            throw new HttpException('Failed to update the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    remove(id: string) {
        try {
            return this.commentRepository.delete({ id });
        } catch (error) {
            console.error("Error removing  comment:", error);
            throw new HttpException('Failed to remove the comment.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
