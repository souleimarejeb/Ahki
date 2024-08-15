import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarksService } from '../Services/bookmarks.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('bookmarks')
@ApiTags('Bookmarks')
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Post()
    create(@Body() booksmarks: IBookmarksInterface) {
        return this.bookmarksService.create(booksmarks);
    }

    @Get()
    findAll() {
        return this.bookmarksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookmarksService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() booksmarks: Partial<IBookmarksInterface>) {
        return this.bookmarksService.update(id, booksmarks);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookmarksService.remove(id);
    }
}
