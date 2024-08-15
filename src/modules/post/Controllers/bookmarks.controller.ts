import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarksService } from '../Services/bookmarks.service';
import { ApiTags } from '@nestjs/swagger';
import { BookMarsEntity } from 'src/common/models/db/Posts/bookmarks.entities';

@Controller('bookmarks')
@ApiTags('Bookmarks')
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Post()
    create(@Body() booksmarks: any) {
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
    update(@Param('id') id: string, @Body() booksmarks: Partial<any>) {
        return this.bookmarksService.update(id, booksmarks);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookmarksService.remove(id);
    }
}
