import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../Services/comments.service';
import { ApiTags } from '@nestjs/swagger';
import { IComments } from 'src/common/models/Interfaces/commentInterface';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
    constructor(private readonly commentService: CommentsService) { }

    @Post()
    create(@Body() comment: IComments) {
        return this.commentService.create(comment);
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
