import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/users/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { PostService } from './post.service';
import { BookmarksEntity } from 'src/common/models/db/Posts/bookmarks.entity';
import { PaginatorService } from 'src/common/Utils/Paginator.service';
import { Query } from 'express-serve-static-core'
import { DEFAULT_RES_PER_PAGE } from 'src/common/Utils/constants';


@Injectable()
export class BookmarksService {
    constructor(
        @InjectRepository(BookmarksEntity) private BookmarksRepository: Repository<BookmarksEntity>,

        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly paginatorService: PaginatorService

    ) { }

    async create(postId: string, userId: string) {
        try {

            const user = await this.userService.findOne(userId);
            if (!user) throw new HttpException('user  not found. Cannot find user  ', HttpStatus.BAD_REQUEST);

            const post = await this.postService.findOne(postId, "{}");
            if (!post) throw new HttpException('post  not found. Cannot find post  ', HttpStatus.BAD_REQUEST);

            const foundBookMarks = await this.BookmarksRepository
                .createQueryBuilder('bookmarks')
                .where('bookmarks.post = :postId', { postId: postId })
                .andWhere('bookmarks.user = :userId', { userId: userId })
                .getOne();

            if (foundBookMarks) throw new HttpException(' Cannot save a  new bookmark , already exist', HttpStatus.BAD_REQUEST);

            const newBookmark = this.BookmarksRepository.create({
                post: post.data[0],
                user: user[0],
            });

            return await this.BookmarksRepository.save(newBookmark);

        } catch (error) {
            console.error(error);
        }
    }

    async findAll(userId: string, query: Query) {
        try {
            const { res, page } = query;
            const paginator = this.paginatorService.setPaginator(Number(res) || DEFAULT_RES_PER_PAGE, Number(page));
            return await this.BookmarksRepository.find({
                relations: {
                    post: true
                },
                where: {
                    user: { id: userId },
                },
                skip: paginator.skip,
                take: paginator.take
            });

        } catch (error) {
            console.error(error);
        }
    }


    remove(id: string) {
        try {
            return this.BookmarksRepository.delete({ id });
        } catch (error) {
            console.error(error);
        }
    }
}
