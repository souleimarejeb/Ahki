import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from '../Services/comments.service';
import { ApiTags } from '@nestjs/swagger';
import { IComments } from 'src/common/models/Interfaces/posts/commentInterface';

@Controller('comments')
@ApiTags('POSTS MGMT - Comments Routes')
export class CommentController {
    constructor(private readonly commentService: CommentsService) { }

    @Post(':Postid')
    create(@Body() comment: Partial<IComments>,
        @Param('Postid',) postId: string,
        @Query('Userid',) userId: string) {
        try {
            return this.commentService.create(comment, postId, userId);
        } catch (error) {
            console.error('Error in create:', error);
            throw new Error('Unable to create posts');
        }

    }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() comment: Partial<IComments>) {
        return this.commentService.update(id, comment);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(id);
    }
}
