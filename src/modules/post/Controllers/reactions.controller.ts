import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionService } from '../Services/reaction.service';
import { ApiTags } from '@nestjs/swagger';
import { IReactions } from 'src/common/models/Interfaces/reactionsInterface';


@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
    constructor(private readonly reactionService: ReactionService) { }

    @Post()
    create(@Body() reaction: IReactions) {
        return this.reactionService.create(reaction);
    }

    @Get()
    findAll() {
        return this.reactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reactionService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() reaction: Partial<IReactions>) {
        return this.reactionService.update(id, reaction);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reactionService.remove(id);
    }
}
