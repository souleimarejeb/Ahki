import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReactionService } from '../Services/reaction.service';
import { ApiTags } from '@nestjs/swagger';
import { IReactions } from 'src/common/models/Interfaces/posts/reactionsInterface';


@Controller('reactions')
@ApiTags('POSTS MGMT - Reactions Routes')
export class ReactionsController {
    constructor(private readonly reactionService: ReactionService

    ) { }

    @Post(':postId')
    create(
        @Body() payload: Partial<IReactions>,
        @Param('postId') postId: string,
        @Query('userId') userId: string
    ) {
        return this.reactionService.create(payload, postId, userId);
    }

    @Get(':postId')
    findAll(
        @Param('postId') postId: string) {
        return this.reactionService.findAll(postId);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.reactionService.remove(id);
    }
}
