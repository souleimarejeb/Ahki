import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from 'src/common/models/db/Posts/posts.entity';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entity';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entity';
import { UserService } from 'src/modules/users/user.service';
import { IPosts } from 'src/common/models/Interfaces/posts/postInterface';
import { isJSON } from 'src/common/utils';
import { BookmarksEntity } from 'src/common/models/db/Posts/bookmarks.entity';

@Injectable()
export class PostService {

    createQueryBuilder: any;

    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        @InjectRepository(ReactionsEntity) private reactionRepository: Repository<ReactionsEntity>,
        @InjectRepository(CommentsEntity) private CommentRepository: Repository<CommentsEntity>,
        @InjectRepository(BookmarksEntity) private BookmarkRepository: Repository<BookmarksEntity>,

        private readonly userService: UserService,

    ) { }

    async create(id: string, payload: Partial<IPosts>) {
        try {
            const user = await this.userService.findOne(id);

            if (!user) throw new HttpException('Record not found', HttpStatus.BAD_REQUEST);

            if (user[0].tokenBlance < 70) throw new HttpException('post  cannot be posted. need more token ', HttpStatus.BAD_REQUEST);

            user[0].tokenBlance = user[0].tokenBlance - 70;
            await this.userService.update(id, { tokenBlance: user[0].tokenBlance });

            const newpost = this.postRepository.create({
                ...payload,
                user: user[0],
            });

            return await this.postRepository.save(newpost);

        } catch (error) {
            console.error(error);
        }
    }

    findAll() {
        try {
            return this.postRepository.find({ relations: ['user'] });
        } catch (error) {
            console.error(error);
        }
    }

    async findOne(id: string, options: string) {
        try {

            let relations = {
                comments: false,
                reactions: false,
                user: false
            };

            if (options && isJSON(options)) {
                // verify passed options
                const passedInOptions = JSON.parse(options);
                relations = passedInOptions['relations'];
            }


            // return one post with chosen relations
            const foundPost = await this.postRepository.find({
                relations: {
                    comments: relations?.comments,
                    reactions: relations?.reactions,
                    user: relations?.user,
                },
                where: { id },
            });

            if (!foundPost) throw new HttpException('Record not found', HttpStatus.BAD_REQUEST);

            const countReaction = await this.reactionRepository
                .createQueryBuilder("reaction")
                .where("reaction.postid = :id", { id })
                .getCount()

            const countComment = await this.CommentRepository
                .createQueryBuilder("comment")
                .where("comment.postid = :id", { id })
                .getCount()


            const countBookmarks = await this.BookmarkRepository
                .createQueryBuilder("bookmark")
                .where("bookmark.postid = :id", { id })
                .getCount()

            return {
                data: foundPost,
                reactions: countReaction,
                comments: countComment,
                bookmark: countBookmarks
            };

        } catch (error) {
            console.error(error);
        }
    }

    async update(id: string, payload: Partial<IPosts>) {
        try {
            return await this.postRepository.update({ id }, { ...payload });

        } catch (error) {
            console.error(error);
        }
    }

    async remove(id: string) {
        try {
            return this.postRepository.delete({ id });
        } catch (error) {
            console.error(error);
        }
    }
}
