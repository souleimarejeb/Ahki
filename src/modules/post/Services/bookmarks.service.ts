import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookMarsEntity } from 'src/common/models/db/Posts/bookmarks.entities';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class BookmarksService {
    constructor(@InjectRepository(BookMarsEntity) private bookmarksRepository: Repository<BookMarsEntity>,
    ) { }
    create(bookmarksDetails: IBookmarksInterface) {
        const newBookmark = this.bookmarksRepository.create({
            ...bookmarksDetails,

        });
        return this.bookmarksRepository.save(newBookmark)
    }

    findAll() {
        return this.bookmarksRepository.find();
    }

    findOne(id: string) {
        return this.bookmarksRepository.findBy({ id });
    }

    update(id: string, updateBookmarks: Partial<IBookmarksInterface>) {
        return this.bookmarksRepository.update({ id }, { ...updateBookmarks });
    }

    remove(id: string) {
        return this.bookmarksRepository.delete({ id });
    }
}
