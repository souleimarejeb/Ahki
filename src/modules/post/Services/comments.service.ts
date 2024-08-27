import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entity';
import { IComments } from 'src/common/models/Interfaces/posts/commentInterface';
import { UserService } from 'src/modules/users/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { PostService } from './post.service';
@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity) private commentRepository: Repository<CommentsEntity>,
        private readonly userService: UserService,
        private readonly postService: PostService,
    ) { }

    async create(payload: Partial<IComments>, postId: string, userId: string) {
        try {

            const user = await this.userService.findOne(userId);
            if (!user) throw new HttpException('user  not found. Cannot find comment  ', HttpStatus.BAD_REQUEST);

            const post = await this.postService.findOne(postId, "{}");
            if (!post) throw new HttpException('post  not found. Cannot find post  ', HttpStatus.BAD_REQUEST);

            user[0].tokenBlance = user[0].tokenBlance + 50;
            await this.userService.update(userId, { tokenBlance: user[0].tokenBlance });


            const newComment = this.commentRepository.create({
                ...payload,
                post: post.data[0],
                user: user[0],
            });

            return await this.commentRepository.save(newComment);

        } catch (error) {
            console.error(error);
        }
    }

    findAll(postId: string) {
        try {
            return this.commentRepository.findBy({
                post: { id: postId },
            });
        } catch (error) {
            console.error(error);
        }
    }

    update(id: string, payload: Partial<IComments>) {
        try {
            return this.commentRepository.update({ id }, { ...payload });
        } catch (error) {
            console.error(error);
        }
    }

    remove(id: string) {
        try {
            return this.commentRepository.delete({ id });
        } catch (error) {
            console.error(error);
        }
    }
}
