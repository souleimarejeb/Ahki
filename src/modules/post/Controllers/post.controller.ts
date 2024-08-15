import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from '../Services/post.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('post')
@ApiTags('Post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    create(@Body() post: IPostInterface) {
        return this.postService.create(post);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() post: Partial<IPostInterface>) {
        return this.postService.update(id, post);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(id);
    }
}
