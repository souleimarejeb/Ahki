import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entity';
import { IReactions } from 'src/common/models/Interfaces/posts/reactionsInterface';
import { UserService } from 'src/modules/users/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { PostService } from './post.service';

@Injectable()
export class ReactionService {
    constructor(
        @InjectRepository(ReactionsEntity) private reactiontRepository: Repository<ReactionsEntity>,
        private readonly userService: UserService,
        private readonly postService: PostService,
    ) { }

    async create(payload: Partial<IReactions>, postId: string, userId: string) {
        try {

            const user = await this.userService.findOne(userId);
            if (!user) throw new HttpException('user  not found.  ', HttpStatus.BAD_REQUEST);

            const post = await this.postService.findOne(postId, "{}");
            if (!post) throw new HttpException('post  not found.', HttpStatus.BAD_REQUEST);

            const foundReaction = await this.reactiontRepository
                .createQueryBuilder('reactions')
                .where('reactions.post = :postId', { postId: postId })
                .andWhere('reactions.user = :userId', { userId: userId })
                .getOne();

            if (foundReaction) throw new HttpException(' Cannot post new reaction  ', HttpStatus.BAD_REQUEST);

            const newReaction = this.reactiontRepository.create({
                ...payload,
                post: post.data[0],
                user: user[0],
            });

            return await this.reactiontRepository.save(newReaction);

        } catch (error) {
            console.error(error);
        }
    }

    async findAll(postId: string) {
        try {
            const foundReactions = await this.reactiontRepository
                .find({
                    relations: {
                        user: true,
                    },
                    where: {
                        post: {
                            id: postId,
                        },
                    },
                })

            return foundReactions;
        } catch (error) {
            console.error(error);
        }
    }

    remove(id: string) {
        try {
            return this.reactiontRepository.delete({ id });
        } catch (error) {
            console.error(error);
        }
    }
}
