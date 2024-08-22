import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from '../Services/comments.service';
import { ApiTags } from '@nestjs/swagger';
import { IComments } from 'src/common/models/Interfaces/posts/commentInterface';

@Controller('comments')
@ApiTags('POSTS MGMT - Comments Routes')
export class CommentController {
    constructor(
        private readonly commentService: CommentsService
    ) { }

    @Post(':Postid')
    create(
        @Body() payload: Partial<IComments>,
        @Param('Postid') postId: string,
        @Query('userId') userId: string
    ) {
        return this.commentService.create(payload, postId, userId);
    }

    @Get(':Postid')
    findAll(@Param('Postid') postId: string,) {
        return this.commentService.findAll(postId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() payload: Partial<IComments>
    ) {
        return this.commentService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(id);
    }
}
