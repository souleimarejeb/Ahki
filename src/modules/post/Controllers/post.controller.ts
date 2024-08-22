import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from '../Services/post.service';
import { ApiTags } from '@nestjs/swagger';
import { IPosts } from 'src/common/models/Interfaces/posts/postInterface';
import { query } from 'express';

@Controller('posts')
@ApiTags('POSTS MGMT - Posts Routes')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) { }

    @Post(':userId')
    async create(
        @Body() payload: Partial<IPosts>,
        @Param('userId') userId: string,
    ) {
        return this.postService.create(userId, payload);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('options') options: string
    ) {
        return this.postService.findOne(id, options);
    }

    @Patch(':id')
    update(
        @Body() payload: Partial<IPosts>,
        @Param('id') id: string
    ) {
        return this.postService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id') id: string,) {
        return await this.postService.remove(id);
    }
}
