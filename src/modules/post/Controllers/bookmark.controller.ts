import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookmarksService } from '../Services/bookmarks.service';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('bookmarks')
@ApiTags('POSTS MGMT - BookMarks Routes')
export class BookmarksController {
    constructor(private readonly bookmarkService: BookmarksService

    ) { }

    @Post(':postId')
    create(
        @Param('postId') postId: string,
        @Query('userId') userId: string
    ) {
        return this.bookmarkService.create(postId, userId);
    }

    @Get(':userId')
    findAll(
        @Param('userId') userId: string,
        @Query() query: ExpressQuery
    ) {
        return this.bookmarkService.findAll(userId, query);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookmarkService.remove(id);
    }
}
